import {Component, computed, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Toast} from 'primeng/toast';
import {checkTokenExpiry} from '@/lib/utils';
import {UserStore} from '@/store/user-store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './cmrp.html',
  styleUrl: './cmrp.css'
})
export class Cmrp implements OnInit {
  protected userStore = inject(UserStore)
  protected auth = this.userStore.authData()()
  protected isSignedIn = computed(() => this.userStore.isUserSignedIn()());

  ngOnInit() {
    const isTokenExpired = checkTokenExpiry(this.auth.expiry);
    if (!this.isSignedIn() || isTokenExpired) {
      this.userStore.signOut();
      return;
    }
    this.userStore.fetchUserInfo();
  }

}
