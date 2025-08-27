import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {incidentFilters, incidentsSummary, incidentTable, incidentTableHeaders} from "@/constants/index";
import {IncidentHighlight} from "@/pages/dashboard-layout/incidents/incident-highlight/incident-highlight";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {Select} from "primeng/select";
import {FormsModule} from "@angular/forms";
import {cn, getIncidentSeverity} from "@/lib/utils";
import {TableModule} from "primeng/table";
import {TitleCasePipe} from "@angular/common";
import {Tag} from "primeng/tag";
import {Button, ButtonDirective} from "primeng/button";
import {Tooltip} from "primeng/tooltip";
import {Dialog} from "primeng/dialog";
import {IncidentDetails} from "@/pages/dashboard-layout/incidents/incident-details/incident-details";
import {Subject, takeUntil} from 'rxjs';
import {IncidentsService} from '@/services/incidents-service/incidents-service';
import {MessageService} from 'primeng/api';
import {Skeleton} from 'primeng/skeleton';
import {IIncidentDetails} from '@/interfaces/incident-interface';

@Component({
  selector: 'cmrp-incidents',
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
    Dialog,
    IncidentDetails,
    ButtonDirective,
    Skeleton
  ],
  templateUrl: './incidents.html',
  styleUrl: './incidents.css'
})
export class Incidents implements OnInit, OnDestroy {
  protected readonly cn = cn;
  protected readonly getIncidentSeverity = getIncidentSeverity;
  protected readonly incidentTable = incidentTable;
  protected readonly incidentTableHeaders = incidentTableHeaders;
  protected showIncidentDetailsModal = false
  protected selectedIncident = signal("")
  protected showEditDetailsOptions = signal(false)
  protected readonly incidentsSummary = incidentsSummary;
  protected destroy$ = new Subject<void>();
  protected selectedFilter = {
    name: "All Status",
    code: "all"
  }
  protected readonly incidentFilters = incidentFilters;
  protected tableSkeletonArray = Array.from({length: 7}).map((_, i) => `Item #${i}`) as unknown as Partial<IIncidentDetails>[];
  protected isFetchingIncidents = signal(false)
  protected incidentsService = inject(IncidentsService);
  protected messageService = inject(MessageService);

  ngOnInit() {
    this.fetchIncidents()
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected fetchIncidents() {
    this.isFetchingIncidents.set(true)
    this.incidentsService.fetchIncidents().pipe(takeUntil(this.destroy$)).subscribe({
      next: data => {
        this.isFetchingIncidents.set(false)
        console.log(data)
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
    return this.incidentTable.find(incident => incident.id === this.selectedIncident()) ?? {
      id: "",
      assignedOfficer: "",
      priority: "",
      description: "",
      status: "",
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
