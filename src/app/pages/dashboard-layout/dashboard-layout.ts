import {Component} from '@angular/core';
import {Avatar} from "primeng/avatar";
import {ButtonDirective} from "primeng/button";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {dashboardData} from '@/constants/index';
import {Message} from 'primeng/message';

@Component({
  selector: 'cmrp-dashboard-layout',
  imports: [
    Avatar,
    ButtonDirective,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    Message
  ],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css'
})
export class DashboardLayout {

  protected readonly dashboardData = dashboardData;
}
