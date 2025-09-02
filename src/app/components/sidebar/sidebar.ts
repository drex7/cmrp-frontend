import {ChangeDetectionStrategy, Component, computed, effect, inject, input, output, signal} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {sidebarData} from '@/constants/index';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {Avatar} from 'primeng/avatar';
import {UserStore} from '@/store/user-store';
import {SidebarInterface} from '@/interfaces/sidebar-interface';
import {cn} from '@/lib/utils';

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
  public isSmallerScreen = input(false)
  public setIsSidebarOpen = output()

  protected userStore = inject(UserStore)
  protected user = this.userStore.userData();
  protected isSignedIn = computed(() => this.userStore.isUserSignedIn()());

  protected navLinks = signal<SidebarInterface[]>([])
  protected readonly cn = cn;

  constructor() {
    effect(() => {
      const data = sidebarData.map(item => {
        if (item.title === 'Dashboard') {
          return {...item, isAccessible: true};
        }

        if (item.title.toLowerCase() === 'my incidents') {
          const isAccessible = this.isSignedIn() && !!this.user().name.length && this.user().role === 'Citizen'
          return {...item, isAccessible};
        }

        if (item.title.toLowerCase() === 'users') {
          const isAccessible = this.isSignedIn() && !!this.user().name.length && this.user().role === 'Admin'
          return {...item, isAccessible};
        }

        const canAccess =
          this.isSignedIn() && ['Admin', 'CityOfficial'].includes(this.user().role);
        return {...item, isAccessible: canAccess};
      }).filter(item => item.isAccessible);
      this.navLinks.set(data)
    });
  }

  protected signOut() {
    this.setIsSidebarOpen.emit()
    this.userStore.signOut()
  }
}
