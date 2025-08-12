import {Component} from '@angular/core';
import {dashboardData, incidentsData} from "@/constants/index";
import {Card} from 'primeng/card';
import {cn} from '@/lib/utils';

@Component({
  selector: 'cmrp-dashboard',
  imports: [
    Card
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  protected readonly dashboardData = dashboardData;
  protected readonly incidentsData = incidentsData;
  protected readonly cn = cn;
}
