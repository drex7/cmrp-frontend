import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {Card} from 'primeng/card';
import {cn} from '@/lib/utils';
import {IncidentCard} from '@/components/incident-card/incident-card';
import {Subject, takeUntil} from 'rxjs';
import {DashboardService} from '@/services/dashboard/dashboard';
import {PrimeIcons} from 'primeng/api';
import {Skeleton} from 'primeng/skeleton';
import {IncidentI} from '@/interfaces/incident-interface';

@Component({
  selector: 'cmrp-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Card,
    IncidentCard,
    IncidentCard,
    Skeleton
  ],
})
export class Dashboard implements OnInit, OnDestroy {
  protected readonly incidentSummaryCards = signal([
      {
        title: "total incidents",
        description: "All reported incidents",
        total: 0,
        icon: PrimeIcons.EXCLAMATION_TRIANGLE
      }, {
        title: "pending review",
        description: "awaiting assignment",
        total: 0,
        icon: PrimeIcons.CLOCK
      }, {
        title: "in progress",
        description: "currently being resolved",
        total: 0,
        icon: PrimeIcons.CHART_LINE
      }, {
        title: "resolved",
        description: "successfully completed",
        increment: true,
        total: 0,
        icon: PrimeIcons.CHECK_CIRCLE
      },
    ]
  );
  protected readonly cn = cn;
  protected recentIncidents = signal<IncidentI[]>([]);
  protected isFetchingIncidents = signal(false)
  protected destroy$ = new Subject<void>()

  protected dashboardService = inject(DashboardService)
  protected readonly Array = Array;

  ngOnInit() {
    if (this.incidentSummaryCards().every(card => card.total === 0)) {
      this.fetchIncidentsOverview()

    }
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  protected fetchIncidentsOverview() {
    this.isFetchingIncidents.set(true);
    this.dashboardService.fetchIncidentsOverview()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({statistics: {totalInReview, totalResolved, totalItems, totalPending, items}}) => {
          console.log(items)
          const incidents = items.map((item) => ({
            ...item,
            assignedOfficer: "-",
            region: "",
            city: ""
          }))

          this.recentIncidents.set(incidents)

          this.isFetchingIncidents.set(false);

          const totalsMap: Record<string, number> = {
            "total incidents": totalItems,
            "pending review": totalPending,
            "in progress": totalInReview,
            "resolved": totalResolved,
          };

          this.incidentSummaryCards.update((incidents) =>
            incidents.map((item) => {
              const total = totalsMap[item.title];
              return total !== undefined ? {...item, total} : item;
            })
          );

        },
        error: (error) => {
          console.error("fetch incidents summary error:", error);
        }
      });
  }
}
