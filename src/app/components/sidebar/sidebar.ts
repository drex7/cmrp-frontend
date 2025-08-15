import {ChangeDetectionStrategy, Component, computed, effect, inject, signal} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {sidebarData} from '@/constants/index';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {Avatar} from 'primeng/avatar';
import {UserStore} from '@/store/user-store';
import {SidebarInterface} from '@/interfaces/sidebar-interface';

@Component({
  selector: 'cmrp-sidebar',
  imports: [
    ButtonDirective,
    RouterLink,
    RouterLinkActive,
    Avatar
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Sidebar {

  protected userStore = inject(UserStore)
  protected user = computed(() => this.userStore.userData()());
  protected isSignedIn = computed(() => this.userStore.isSignedIn());

  protected navLinks = signal<SidebarInterface[]>([])

  constructor() {
    effect(() => {
      if (this.user().userId.length) {
        const data = sidebarData.map(item => {
          if (item.title === 'Dashboard') {
            return {...item, isAccessible: true};
          }

          if (item.title.toLowerCase() === 'my incidents') {
            const isAccessible = this.userStore.isSignedIn() && this.user().role === 'Citizen'
            return {...item, isAccessible};
          }

          const canAccess =
            this.userStore.isSignedIn() && ['Admin', 'CityOfficial'].includes(this.user().role);
          return {...item, isAccessible: canAccess};
        }).filter(item => item.isAccessible);


        this.navLinks.set(data)
      }
    });
  }

  protected signOut() {
    this.userStore.signOut()
  }
}
