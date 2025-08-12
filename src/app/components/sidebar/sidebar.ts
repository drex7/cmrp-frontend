import {Component, computed, inject, OnInit, signal} from '@angular/core';
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
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit {

  protected userStore = inject(UserStore)
  protected user = this.userStore.user;
  protected isSignedIn = computed(() => this.user.isSignedIn());

  protected navLinks = signal<SidebarInterface[]>([])
  protected readonly sidebarData = sidebarData;

  ngOnInit() {
    const data = sidebarData.map(item => {
      if (item.title === 'Dashboard') {
        return {...item, isAccessible: true};
      }
      const canAccess =
        this.user.isSignedIn() && ['admin', 'city_official'].includes(this.user.role());
      console.log(canAccess)
      return {...item, isAccessible: canAccess};
    }).filter(item => item.isAccessible);


    this.navLinks.set(data)
  }
}
