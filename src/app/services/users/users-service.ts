import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserStore} from '@/store/user-store';
import {environment} from '@/environments/environment';
import {AuthFormInterface} from '@/interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);
  private userStore = inject(UserStore)
  private idToken = this.userStore.authData()().idToken;

  public fetchUsers() {
    return this.http.get<{
      counts: {
        total_users: number;
        city_official: number;
        citizens: number;
        admin: number;
      },
      users: Partial<AuthFormInterface>[]
    }>(`${environment.baseUrl}/users`)
  }
}
