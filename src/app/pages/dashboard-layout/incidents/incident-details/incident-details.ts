import {ChangeDetectionStrategy, Component, effect, input, OnInit, output, signal} from '@angular/core';
import {IncidentI} from '@/interfaces/incident-interface';
import {Tag} from 'primeng/tag';
import {getIncidentSeverity} from '@/lib/utils';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {Textarea} from 'primeng/textarea';

@Component({
  selector: 'cmrp-incident-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './incident-details.html',
  styleUrl: './incident-details.css',
  imports: [
    Tag,
    Select,
    FormsModule,
    Textarea,
  ],
})
export class IncidentDetails implements OnInit {
  public showEditOptions = input(false)
  public incident = input<IncidentI>({
    category: '', description: '',
    title: "",
    assignedOfficer: "",
    incidentId: "",
    location: "",
    severity: "low",
    createdBy: "",
    status: "pending",
    imageUrls: []
  })
  public updateIncidentStatus = output<{
    comments: string,
    status: string
  }>()
  protected readonly getIncidentSeverity = getIncidentSeverity;
  protected comment = signal("");

  protected selectedStatus = signal({
    name: "",
    code: ""
  })
  protected statuses = [
    {name: 'Pending', code: 'pending'},
    {name: 'In Progress', code: 'in_progress'},
    {name: 'Resolved', code: 'resolved'}
  ];


  constructor() {
    effect(() => {
      if (this.selectedStatus() || this.comment()) {
        this.updateIncidentStatus.emit({
          comments: this.comment(),
          status: this.selectedStatus().code
        })
      }
    });
  }

  ngOnInit() {
    this.selectedStatus.set({
      name: this.incident().status.charAt(0).toUpperCase() + this.incident().status.slice(1),
      code: this.incident().status
    })
  }
}
