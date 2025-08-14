import {Component} from '@angular/core';
import {incidentsSummary} from "@/constants/index";
import {IncidentHighlight} from "@/pages/dashboard-layout/incidents/incident-highlight/incident-highlight";

@Component({
    selector: 'cmrp-incidents',
    imports: [
        IncidentHighlight
    ],
    templateUrl: './incidents.html',
    styleUrl: './incidents.css'
})
export class Incidents {

    protected readonly incidentsSummary = incidentsSummary;
}
