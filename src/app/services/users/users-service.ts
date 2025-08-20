import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserStore} from '@/store/user-store';
import {environment} from '@/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);
  private userStore = inject(UserStore)
  private idToken = this.userStore.authData()().idToken;

  public fetchUsers() {
    return this.http.get(`${environment.baseUrl}/users`)
  }
}
