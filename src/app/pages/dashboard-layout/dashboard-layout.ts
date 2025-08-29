import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {Router, RouterOutlet} from "@angular/router";
import {Message} from 'primeng/message';
import {UserStore} from '@/store/user-store';
import {Sidebar} from '@/components/sidebar/sidebar';
import {LoaderComponent} from "@/components/loader-component/loader-component";
import {BreakpointService} from '@/services/breakpoint-service/breakpoint-service';
import {Drawer} from 'primeng/drawer';

@Component({
  selector: 'cmrp-dashboard-layout',
  imports: [
    ButtonDirective,
    RouterOutlet,
    Message,
    Sidebar,
    LoaderComponent,
    Drawer
  ],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardLayout {
  protected breakpointService = inject(BreakpointService);
  protected userStore = inject(UserStore)
  protected router = inject(Router)
  protected user = this.userStore.userData()();
  protected auth = this.userStore.authData()()
  protected isSignedIn = computed(() => this.userStore.isUserSignedIn()());

  protected isSidebarOpen = false;
  protected isFetchingUser = computed(() => this.userStore.isLoading());
  protected isSmallerScreen = computed(() => this.breakpointService.isSmallerScreen());


  protected async login() {
    await this.router.navigate(['login'])
  }
}
