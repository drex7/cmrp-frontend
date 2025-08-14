import {Component} from '@angular/core';
import {incidentsSummary, incidentTable, incidentTableHeaders} from "@/constants/index";
import {IncidentHighlight} from "@/pages/dashboard-layout/incidents/incident-highlight/incident-highlight";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {Select} from "primeng/select";
import {FormsModule} from "@angular/forms";
import {cn} from "@/lib/utils";
import {TableModule} from "primeng/table";
import {TitleCasePipe} from "@angular/common";
import {IncidentType} from "@/types/index";
import {Tag} from "primeng/tag";
import {Button} from "primeng/button";
import {Tooltip} from "primeng/tooltip";

@Component({
    selector: 'cmrp-incidents',
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
        Tooltip
    ],
    templateUrl: './incidents.html',
    styleUrl: './incidents.css'
})
export class Incidents {

    protected readonly incidentsSummary = incidentsSummary;
    protected selectedFilter = {
        name: "All Status",
        code: "all"
    }


    protected filters = [
        {name: 'All Status', code: 'all'},
        {name: 'Active', code: 'active'},
        {name: 'Pending', code: 'pending'},
        {name: 'Investigating', code: 'investigating'},
        {name: 'Resolved', code: 'resolved'}
    ];
    protected readonly cn = cn;
    protected readonly incidentTable = incidentTable;
    protected readonly incidentTableHeaders = incidentTableHeaders;

    protected getIncidentSeverity(incident: IncidentType) {
        const dataMap: Record<IncidentType, string> = {
            low: "secondary",
            urgent: "danger",
            high: "danger",
            medium: "warn",
            active: "danger",
            investigating: "info",
            resolved: "success",
        };

        return dataMap[incident];
    }
}
