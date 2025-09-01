import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  private readonly http = inject(HttpClient);


  public createIncident(data: any) {
    return this.http.post(`${environment.baseUrl}/incidents`, data);
  }

  public fetchUserIncidents() {
    return this.http.get(`${environment.baseUrl}/incidents/mine`)
  }

  public fetchIncidents() {
    // return this.http.get(`${environment.baseUrl}/incidents`)
    return this.http.get(`https://17c6af714f00.ngrok-free.app/incidents`)
  }


}
