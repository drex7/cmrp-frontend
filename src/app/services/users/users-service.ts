import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@/environments/environment';
import {AuthFormInterface} from '@/interfaces/user-interface';
import {Cacheable} from 'ts-cacheable';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly http = inject(HttpClient);

  @Cacheable()
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
    return this.http.delete<{ message: string }>(`${environment.baseUrl}/users`, {
      body: {username}
    });
  }
}
