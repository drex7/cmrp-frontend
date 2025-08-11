import {Component} from '@angular/core';
import {dashboardData} from "@/constants/index";
import {RouterLink} from '@angular/router';

@Component({
  selector: 'cmrp-dashboard',
  imports: [
    RouterLink
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  protected readonly dashboardData = dashboardData;
}
