import {Component} from '@angular/core';
import {dashboardData} from "@/constants/index";
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'cmrp-dashboard',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  protected readonly dashboardData = dashboardData;
}
