import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {incidentsData, recentIncidentsData} from "@/constants/index";
import {Card} from 'primeng/card';
import {cn} from '@/lib/utils';
import {IncidentCard} from '@/components/incident-card/incident-card';
import {HttpClient} from '@angular/common/http';
import {Subject, takeUntil} from 'rxjs';
import {environment} from '@/environments/environment';

@Component({
  selector: 'cmrp-dashboard',
  imports: [
    Card,
    IncidentCard,
    IncidentCard
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard implements OnInit, OnDestroy {
  protected readonly incidentsData = incidentsData;
  protected readonly cn = cn;
  protected readonly recentIncidentsData = recentIncidentsData;
  protected http = inject(HttpClient)
  protected destroy$ = new Subject<void>()

  ngOnInit() {
    this.fetchIncidentsOverview()
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  protected fetchIncidentsOverview() {
    this.http.get(`${environment.baseUrl}/dashboard`).pipe(takeUntil(this.destroy$)).subscribe({
      next: data => {
        console.log(data)
      },
      error: error => {
        console.error("fetch incidents summary error:", error)
      }
    })
  }
}
