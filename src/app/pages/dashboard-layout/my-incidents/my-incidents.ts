import {ChangeDetectionStrategy, Component, computed, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {Button, ButtonDirective} from "primeng/button";
import {IncidentHighlight} from '@/pages/dashboard-layout/incidents/incident-highlight/incident-highlight';
import {
  incidentCategories,
  incidentFilters,
  incidentSeverities,
  incidentsSummary,
  incidentTableHeaders
} from '@/constants/index';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {TableModule} from 'primeng/table';
import {Tag} from 'primeng/tag';
import {NgOptimizedImage, TitleCasePipe} from '@angular/common';
import {cn, getIncidentSeverity} from '@/lib/utils';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Dialog} from 'primeng/dialog';
import {IncidentDetails} from '@/pages/dashboard-layout/incidents/incident-details/incident-details';
import {UserStore} from '@/store/user-store';
import {FloatLabel} from 'primeng/floatlabel';
import {Textarea} from 'primeng/textarea';
import {IncidentsService} from '@/services/incidents-service/incidents-service';
import {ToastService} from '@/services/toast-service/toast-service';
import {Subject, take, takeUntil} from 'rxjs';
import {IncidentI} from '@/interfaces/incident-interface';
import {Skeleton} from 'primeng/skeleton';

@Component({
  selector: 'cmrp-my-incidents',
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './my-incidents.html',
  styleUrl: './my-incidents.css',
  imports: [
    ButtonDirective,
    IncidentHighlight,
    Button,
    IconField,
    InputIcon,
    InputText,
    Select,
    TableModule,
    Tag,
    TitleCasePipe,
    FormsModule,
    Dialog,
    IncidentDetails,
    FloatLabel,
    ReactiveFormsModule,
    Textarea,
    NgOptimizedImage,
    Skeleton
  ],
})
export class MyIncidents implements OnInit, OnDestroy {
  protected toastService = inject(ToastService);
  protected incidentsService = inject(IncidentsService)
  protected userStore = inject(UserStore);
  protected readonly incidentsSummary = incidentsSummary.slice(0, 3);
  protected readonly getIncidentSeverity = getIncidentSeverity;
  protected readonly incidentTable = signal<IncidentI[]>([]);
  protected readonly incidentTableHeaders = incidentTableHeaders.filter(ind => !["reporter", "actions"].includes(ind));
  protected readonly incidentFilters = incidentFilters;
  protected showIncidentDetailsModal = false
  protected showAddIncidentModal = false
  protected selectedIncident = signal("")
  protected showEditDetailsOptions = signal(false)
  protected images = signal<{ file: File, url: string }[]>([]);
  protected isFetchingIncidents = signal(false)
  protected readonly incidentSeverities = incidentSeverities;
  protected readonly incidentCategories = incidentCategories;
  protected tableSkeletonArray = Array.from({length: 8}).map((_, i) => `Item #${i}`) as unknown as Partial<IncidentI>[];
  protected readonly cn = cn;
  protected isSubmitting = signal(false)
  protected destroy$ = new Subject<void>();

  protected incidents = signal<IncidentI[]>([])
  protected incidentForm: FormGroup = new FormGroup({
    title: new FormControl("", [Validators.required]),
    category: new FormControl("", [Validators.required]),
    severity: new FormControl("", [Validators.required]),
    location: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
  });
  protected incidentFormControls = signal<string[]>(Object.keys(this.incidentForm.controls));

  protected searchValue = signal("")
  protected selectedSeverity = signal(this.incidentSeverities[0])
  protected selectedStatus = signal(this.incidentFilters[0]);

  protected filteredIncidents = computed(() => {
    const search = this.searchValue().toLowerCase().trim();
    const status = this.selectedStatus()?.value ?? 'all';
    const severity = this.selectedSeverity()?.value ?? 'all';

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


  ngOnInit() {
    if (this.incidents().length < 1) {
      this.isFetchingIncidents.set(true)
      this.fetchIncidents()
    }
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  protected fetchIncidents() {
    this.incidentsService.fetchUserIncidents().pipe(takeUntil(this.destroy$)).subscribe({
      next: data => {
        this.isFetchingIncidents.set(false)
        this.incidents.set(data.incidents)
      }, error: err => {
        this.isFetchingIncidents.set(false)
        this.handleError(err as Error)
      }
    })
  }

  protected getInputType(key: string): string {
    const types: { [key: string]: string } = {
      title: 'text',
      description: 'text',
      severity: 'text',
      location: 'text'
    };
    return types[key];
  }

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processFiles(input.files);
    }
  }

  protected onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const dropZone = event.currentTarget as HTMLElement;
    dropZone.classList.add('dragover');
  }

  protected onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const dropZone = event.currentTarget as HTMLElement;
    dropZone.classList.remove('dragover');
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const dropZone = event.currentTarget as HTMLElement;
    dropZone.classList.remove('dragover');

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.processFiles(event.dataTransfer.files);
    }
  }

  protected removeImage(index: number): void {
    const newImagesList = this.images().filter((_, i) => i !== index);
    this.images.set(newImagesList);
  }

  protected getIncidentDetails() {
    return this.incidentTable().find(incident => incident.incidentId === this.selectedIncident()) ?? {
      incidentId: "",
      severity: "low",
      description: "",
      status: "pending",
      location: "",
      title: "",
      category: "",
      reporter: "",
      assignedOfficer: "",

    }
  }

  protected incidentAction(incidentId: string, showEditOptions: boolean) {
    this.selectedIncident.set(incidentId);
    this.showIncidentDetailsModal = true;
    this.showEditDetailsOptions.set(showEditOptions);
    this.getIncidentDetails()
  }

  protected cancelIncidentOperation() {
    this.isSubmitting.set(false)
    this.incidentForm.reset();
  }

  protected async onSubmit() {
    this.isSubmitting.set(true);
    if (this.incidentForm.valid) {
      const formData = this.incidentForm.value;
      const incidentData = {
        ...formData,
        images: this.images(),
        reportedBy: this.userStore.userData()().userId,
        status: 'Pending',
      };

      this.incidentsService.createIncident(incidentData).pipe(take(1)).subscribe({
        next: data => {
          this.showAddIncidentModal = false
          this.fetchIncidents()
          console.log(data)
        }, error: err => {
          this.handleError(err as Error)
        }
      })
      this.isSubmitting.set(false);
      this.cancelIncidentOperation();
    }
  }

  private processFiles(files: FileList): void {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            const image = {
              file,
              url: e.target.result as string
            }
            this.images.set([...this.images(), image])
          }
        };
        reader.readAsDataURL(file);

      } else {
        alert("Only image files are allowed.");
      }
    });
  }

  private handleError(error: Error, type = "Login"): void {
    this.toastService.showToast("error", `${type} failed`, error.message);
    this.isSubmitting.set(false);
  }
}
