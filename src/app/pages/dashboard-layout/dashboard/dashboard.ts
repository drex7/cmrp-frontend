import {Component} from '@angular/core';
import {dashboardData, incidentsData, recentIncidentsData} from "@/constants/index";
import {Card} from 'primeng/card';
import {cn} from '@/lib/utils';
import {Chip} from 'primeng/chip';

@Component({
  selector: 'cmrp-dashboard',
  imports: [
    Card,
    Chip
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  protected readonly dashboardData = dashboardData;
  protected readonly incidentsData = incidentsData;
  protected readonly cn = cn;
  protected readonly recentIncidentsData = recentIncidentsData;
}
