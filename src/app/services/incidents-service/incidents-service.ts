import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  private readonly http = inject(HttpClient);

  public createIncident(data: any) {
    return this.http.post(`${environment.incidentsUrl}/incidents`, data);
  }

  public fetchIncidents() {
    return this.http.get(`${environment.incidentsUrl}/incidents`)
  }
}
