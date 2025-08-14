import {Component, input, OnInit} from '@angular/core';
import {IIncidentDetails} from '@/interfaces/incident-interface';
import {Tag} from 'primeng/tag';
import {getIncidentSeverity} from '@/lib/utils';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'cmrp-incident-details',
  imports: [
    Tag,
    Select,
    FormsModule,
  ],
  templateUrl: './incident-details.html',
  styleUrl: './incident-details.css'
})
export class IncidentDetails implements OnInit {
  public showEditOptions = input(false)
  public incident = input<IIncidentDetails>({
    title: "",
    assignedOfficer: "",
    id: "",
    location: "",
    priority: "",
    reported: "",
    status: " "
  })
  protected readonly getIncidentSeverity = getIncidentSeverity;

  protected selectedStatus = {
    name: "",
    code: ""
  }
  protected statuses = [
    {name: 'Active', code: 'active'},
    {name: 'Pending', code: 'pending'},
    {name: 'Investigating', code: 'investigating'},
    {name: 'Resolved', code: 'resolved'}
  ];

  ngOnInit() {
    this.selectedStatus = {
      name: this.incident().status.charAt(0).toUpperCase() + this.incident().status.slice(1),
      code: this.incident().status
    }
  }
}
