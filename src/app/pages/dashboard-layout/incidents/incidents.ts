import {ChangeDetectionStrategy, Component, computed, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {incidentFilters, incidentsSummary, incidentTableHeaders} from "@/constants/index";
import {IncidentHighlight} from "@/pages/dashboard-layout/incidents/incident-highlight/incident-highlight";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {Select} from "primeng/select";
import {FormsModule} from "@angular/forms";
import {cn, getIncidentSeverity} from "@/lib/utils";
import {TableModule} from "primeng/table";
import {NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {Tag} from "primeng/tag";
import {Button, ButtonDirective} from "primeng/button";
import {Tooltip} from "primeng/tooltip";
import {Subject, take, takeUntil} from 'rxjs';
import {IncidentsService} from '@/services/incidents-service/incidents-service';
import {MessageService} from 'primeng/api';
import {Skeleton} from 'primeng/skeleton';
import {IncidentsI} from '@/interfaces/incident-interface';
import {Dialog} from 'primeng/dialog';
import {IncidentDetails} from '@/pages/dashboard-layout/incidents/incident-details/incident-details';

@Component({
  selector: 'cmrp-incidents',
  templateUrl: './incidents.html',
  styleUrl: './incidents.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IncidentHighlight,
    IconField,
    InputIcon,
    InputText,
    Select,
    FormsModule,
    TableModule,
    TitleCasePipe,
    Tag,
    Button,
    Tooltip,
    Skeleton,
    NgOptimizedImage,
    Dialog,
    IncidentDetails,
    ButtonDirective
  ],

})
export class Incidents implements OnInit, OnDestroy {
  protected readonly cn = cn;
  protected readonly getIncidentSeverity = getIncidentSeverity;
  protected readonly incidents = signal<IncidentsI[]>([]);
  protected readonly incidentTableHeaders = incidentTableHeaders;
  protected showIncidentDetailsModal = false
  protected selectedIncident = signal("")
  protected showEditDetailsOptions = signal(false)
  protected readonly incidentsSummary = incidentsSummary;
  protected destroy$ = new Subject<void>();

  protected readonly incidentFilters = incidentFilters;
  protected tableSkeletonArray = Array.from({length: 7}).map((_, i) => `Item #${i}`) as unknown as IncidentsI[];
  protected isFetchingIncidents = signal(false)
  protected incidentsService = inject(IncidentsService);
  protected messageService = inject(MessageService);

  protected searchValue = signal<string>('');
  protected selectedStatus = signal<{
    code: string
    name: string
  }>({
    code: "all",
    name: "All",
  });

  protected filteredIncidents = computed(() => {
    const search = this.searchValue().toLowerCase().trim();
    const status = this.selectedStatus()?.code ?? 'all';

    return this.incidents().filter(incident => {
      const title = (incident.title ?? '').toLowerCase();
      const location = (incident.location ?? '').toLowerCase();
      const assigned = (incident.assignedOfficer ?? incident.assignedOfficer ?? '').toLowerCase();
      const reporter = (incident.reporter ?? '').toLowerCase();

      const matchesSearch = search
        ? [title, location, assigned, reporter].some(text => text.includes(search))
        : true;

      const matchesStatus = status === 'all'
        ? true
        : ((incident.status ?? '').toLowerCase() === status);

      return matchesSearch && matchesStatus;
    });
  });
  protected incidentStatus = signal({
    status: "",
    comments: ""
  })

  ngOnInit() {
    this.fetchIncidents()
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected updateIncidentStatus() {
    this.incidentsService.updateIncidentStatus(this.selectedIncident(), this.incidentStatus()).pipe(take(1)).subscribe({
      next: (val) => {
        console.log(val)
        this.showIncidentDetailsModal = false
      },
      error: err => {
        const errorMessage = (err as { error: { error: string } }).error.error || "Unable to update incident status.";
        this.messageService.add({
          severity: "error",
          summary: "Status Update Error",
          detail: errorMessage,
          life: 3000,
        })
      }
    })
  }

  protected fetchIncidents() {
    this.isFetchingIncidents.set(true)
    this.incidentsService.fetchIncidents().pipe(takeUntil(this.destroy$)).subscribe({
      next: data => {
        this.isFetchingIncidents.set(false)
        this.incidents.set(data.incidents);
      },
      error: err => {
        this.isFetchingIncidents.set(false)
        const error = (err as Error)
        const errorMessage = error.name === "HttpErrorResponse" ? "Failed to fetch incidents" : error.message;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
          life: 3000
        });
      }
    })
  }

  protected getIncidentDetails() {
    return this.incidents().find(incident => incident.incidentId === this.selectedIncident()) ?? {
      incidentId: "",
      category: "",
      description: "",
      assignedOfficer: "",
      severity: "low",
      reporter: "",
      status: "pending",
      reported: "",
      location: "",
      title: ""
    };
  }

  protected incidentAction(incidentId: string, showEditOptions: boolean) {
    this.selectedIncident.set(incidentId);
    this.showIncidentDetailsModal = true;
    this.showEditDetailsOptions.set(showEditOptions);
    this.getIncidentDetails()
  }
}
