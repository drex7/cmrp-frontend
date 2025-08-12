import {Component} from '@angular/core';
import {Avatar} from "primeng/avatar";
import {ButtonDirective} from "primeng/button";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {dashboardData} from '@/constants/index';
import {Message} from 'primeng/message';
import {Dialog} from 'primeng/dialog';
import {Auth} from '@/components/auth/auth';

@Component({
  selector: 'cmrp-dashboard-layout',
  imports: [
    Avatar,
    ButtonDirective,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    Message,
    Dialog,
    Auth
  ],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css'
})
export class DashboardLayout {

  protected readonly dashboardData = dashboardData;
  protected showAuthDialog = false
}
