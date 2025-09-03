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
    }>(`${environment.baseUrl}/users`)
  }

  public deleteUser(username: string) {
    // return this.http.delete(`${environment.baseUrl}/users`, {
    return this.http.delete(`https://c1badb070a98.ngrok-free.app/users`, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      },
      body: {username}
    });
  }
}
