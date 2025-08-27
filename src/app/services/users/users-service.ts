import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@/environments/environment';
import {AuthFormInterface} from '@/interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly http = inject(HttpClient);

  public fetchUsers() {
    return this.http.get<{
      counts: {
        total_users: number;
        city_official: number;
        citizens: number;
        admin: number;
      },
      users: Partial<AuthFormInterface>[]
    }>(`${environment.authUrl}/users`)
  }
}
