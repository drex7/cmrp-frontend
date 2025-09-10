import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {cn} from '@/lib/utils';
import {IncidentI} from '@/interfaces/incident-interface';
import {Chip} from 'primeng/chip';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'cmrp-incident-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Chip,
    DatePipe,
  ],
  templateUrl: './incident-card.html',
  styleUrl: './incident-card.css'
})
export class IncidentCard {

  public incident = input<IncidentI>({
    incidentId: "",
    title: "",
    status: 'pending',
    category: "",
    severity: "low",
    description: "",
    location: "",
    createdBy: "",
    assignedOfficer: "",
    region: "",
    city: ""
  })
  protected readonly cn = cn;
}
