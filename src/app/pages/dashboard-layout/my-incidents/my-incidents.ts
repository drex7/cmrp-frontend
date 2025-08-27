import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {Button, ButtonDirective} from "primeng/button";
import {IncidentHighlight} from '@/pages/dashboard-layout/incidents/incident-highlight/incident-highlight';
import {
  ghanaRegions,
  incidentFilters,
  incidentSeverities,
  incidentsSummary,
  incidentTable,
  incidentTableHeaders
} from '@/constants/index';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {TableModule} from 'primeng/table';
import {Tag} from 'primeng/tag';
import {TitleCasePipe} from '@angular/common';
import {Tooltip} from 'primeng/tooltip';
import {cn, getIncidentSeverity} from '@/lib/utils';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Dialog} from 'primeng/dialog';
import {IncidentDetails} from '@/pages/dashboard-layout/incidents/incident-details/incident-details';
import {UserStore} from '@/store/user-store';
import {FloatLabel} from 'primeng/floatlabel';
import {Textarea} from 'primeng/textarea';

@Component({
  selector: 'cmrp-my-incidents',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    Tooltip,
    FormsModule,
    Dialog,
    IncidentDetails,
    FloatLabel,
    ReactiveFormsModule,
    Textarea
  ],
  templateUrl: './my-incidents.html',
  styleUrl: './my-incidents.css'
})
export class MyIncidents {
  protected userStore = inject(UserStore);
  protected userRegion = this.userStore.userData().region
  protected readonly incidentsSummary = incidentsSummary.slice(0, 3);
  protected readonly getIncidentSeverity = getIncidentSeverity;
  protected readonly incidentTable = incidentTable;
  protected readonly incidentTableHeaders = incidentTableHeaders;
  protected readonly incidentFilters = incidentFilters;
  protected showIncidentDetailsModal = false
  protected showAddIncidentModal = false
  protected selectedIncident = signal("")
  protected showEditDetailsOptions = signal(false)
  protected images = signal<{ file: File, url: string }[]>([]);
  protected selectedFilter = {
    name: "All Status",
    code: "all"
  }

  protected incidentLocations = ghanaRegions.find(region => region.value === this.userRegion())?.cities ?? []

  protected incidentForm: FormGroup = new FormGroup({
    title: new FormControl("", [Validators.required]),
    severity: new FormControl("", [Validators.required]),
    location: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
  });

  protected incidentFormControls = signal<string[]>(Object.keys(this.incidentForm.controls));
  protected readonly incidentSeverities = incidentSeverities;
  protected readonly cn = cn;
  protected isSubmitting = signal(false)

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

  protected cancelIncidentOperation() {
    this.isSubmitting.set(false)
    this.incidentForm.reset();
  }

  protected onSubmit() {
    this.isSubmitting.set(true);
    if (this.incidentForm.valid) {
      const formData = this.incidentForm.value;
      const incidentData = {
        ...formData,
        images: this.images(),
        reportedBy: this.userStore.userData().userId,
        status: 'Pending',
        reported: new Date().toISOString()
      };
      // Here you would typically send the incidentData to your backend API
      console.log("Incident submitted:", incidentData);
      this.isSubmitting.set(false);
      this.cancelIncidentOperation();
    } else {
      alert("Please fill in all required fields.");
      this.isSubmitting.set(false);
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
}
