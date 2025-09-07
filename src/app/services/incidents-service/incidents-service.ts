import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@/environments/environment';
import {IncidentsI} from '@/interfaces/incident-interface';
import {Cacheable} from 'ts-cacheable';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  private readonly http = inject(HttpClient);


  public createIncident(data: any) {
    return this.http.post(`${environment.baseUrl}/incidents`, data);
  }

  @Cacheable()
  public fetchUserIncidents() {
    return this.http.get<
      {
        incidents: IncidentsI[]
        summary: {
          total: number

        }
      }
    >(`${environment.baseUrl}/incidents/mine`)
  }

  @Cacheable()
  public fetchIncidents() {
    return this.http.get<{ incidents: IncidentsI[] }>(`${environment.baseUrl}/incidents`)
  }

  public updateIncidentStatus(incidentId: string, statusUpdate: { comments: string, status: string }) {
    return this.http.put<{
      incident: IncidentsI,
      message: string
    }>(`${environment.baseUrl}/incidents/${incidentId}/status`, statusUpdate);
  }
}
