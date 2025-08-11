import {Component} from '@angular/core';
import {dashboardData} from "@/constants/index";
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {Avatar} from 'primeng/avatar';
import {ButtonDirective} from 'primeng/button';

@Component({
  selector: 'cmrp-dashboard',
  imports: [
    RouterLink,
    RouterLinkActive,
    Avatar,
    ButtonDirective,
    RouterOutlet
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  protected readonly dashboardData = dashboardData;
}
