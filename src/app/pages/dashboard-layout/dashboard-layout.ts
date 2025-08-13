import {Component, computed, inject} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {RouterOutlet} from "@angular/router";
import {Message} from 'primeng/message';
import {Dialog} from 'primeng/dialog';
import {Auth} from '@/components/auth/auth';
import {UserStore} from '@/store/user-store';
import {Sidebar} from '@/components/sidebar/sidebar';

@Component({
  selector: 'cmrp-dashboard-layout',
  imports: [
    ButtonDirective,
    RouterOutlet,
    Message,
    Dialog,
    Auth,
    Sidebar
  ],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css'
})
export class DashboardLayout {

  protected userStore = inject(UserStore)
  protected user = this.userStore.user;
  protected isSignedIn = computed(() => this.user.isSignedIn());
  protected showAuthDialog = false
}
