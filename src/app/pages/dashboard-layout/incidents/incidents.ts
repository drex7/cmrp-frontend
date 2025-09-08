import {ChangeDetectionStrategy, Component, computed, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {incidentFilters, incidentSeverities, incidentsSummary, incidentTableHeaders} from "@/constants/index";
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
import {IncidentI} from '@/interfaces/incident-interface';
import {Dialog} from 'primeng/dialog';
import {IncidentDetails} from '@/pages/dashboard-layout/incidents/incident-details/incident-details';
import {IncidentType} from '@/types/index';

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
  protected readonly incidents = signal<IncidentI[]>([]);
  protected readonly incidentTableHeaders = incidentTableHeaders;
  protected showIncidentDetailsModal = false
  protected selectedIncident = signal("")
  protected showEditDetailsOptions = signal(false)
  protected readonly incidentsSummary = incidentsSummary;
  protected destroy$ = new Subject<void>();

  protected readonly incidentFilters = incidentFilters;
  protected readonly incidentSeverities = incidentSeverities;
  protected tableSkeletonArray = Array.from({length: 8}).map((_, i) => `Item #${i}`) as unknown as IncidentI[];
  protected isFetchingIncidents = signal(false)
  protected isUpdatingIncident = signal(false)
  protected incidentsService = inject(IncidentsService);
  protected messageService = inject(MessageService);

  protected searchValue = signal<string>('');
  protected selectedSeverity = signal(this.incidentSeverities[0])
  protected selectedStatus = signal(this.incidentFilters[0]);

  protected filteredIncidents = computed(() => {
    const search = this.searchValue().toLowerCase().trim();
    const status = this.selectedStatus()?.value ?? 'all';
    const severity = this.selectedSeverity()?.value ?? 'all';
    console.log(search, status, severity);

    return this.incidents().filter(incident => {
      const title = (incident.title ?? '').toLowerCase();
      const location = (incident.location ?? '').toLowerCase();
      const assigned = (incident.assignedOfficer ?? incident.assignedOfficer ?? '').toLowerCase();
      const reporter = (incident.createdBy ?? '').toLowerCase();

      const matchesSearch = search
        ? [title, location, assigned, reporter].some(text => text.includes(search))
        : true;

      const matchesSeverity = severity === 'all'
        ? true
        : ((incident.severity ?? '').toLowerCase() === severity);

      const matchesStatus = status === 'all'
        ? true
        : ((incident.status ?? '').toLowerCase() === status);

      return matchesSearch && matchesSeverity && matchesStatus;
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
    this.isUpdatingIncident.set(true);
    const status = {
      status: this.incidentStatus().status.toUpperCase(),
      comments: this.incidentStatus().comments
    }
    this.incidentsService.updateIncidentStatus(this.selectedIncident(), status).pipe(take(1)).subscribe({
      next: ({incident, message}) => {
        this.messageService.add({
          severity: "success",
          summary: "Status Update Success",
          detail: message,
          life: 3000,
        })

        this.showIncidentDetailsModal = false
        this.isUpdatingIncident.set(false);
        this.incidents.update(incidents =>
          incidents.map(item =>
            item.incidentId === incident.incidentId ? {...item, ...incident} : item
          )
        );
        this.showEditDetailsOptions.set(false)
      },
      error: err => {
        this.isUpdatingIncident.set(false);
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
    const incident =
      this.incidents().find(
        (incident) => incident.incidentId === this.selectedIncident()
      ) ?? {
        incidentId: "",
        category: "",
        description: "",
        assignedOfficer: "",
        severity: "low",
        reporter: "",
        status: "pending",
        location: "",
        title: "",
      };

    return {
      ...incident,
      status: incident.status.toLowerCase() as IncidentType,
    };
  }

  protected incidentAction(incidentId: string, showEditOptions: boolean) {
    this.selectedIncident.set(incidentId);
    this.showIncidentDetailsModal = true;
    this.showEditDetailsOptions.set(showEditOptions);
    this.getIncidentDetails()
  }
}
