import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@/environments/environment';
import {IIncidentDetails, IncidentsI} from '@/interfaces/incident-interface';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  private readonly http = inject(HttpClient);


  public createIncident(data: any) {
    return this.http.post(`${environment.baseUrl}/incidents`, data);
  }

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

  public fetchIncidents() {
    return this.http.get<{ incidents: IIncidentDetails[] }>(`${environment.baseUrl}/incidents`)
  }


}
