import {inject, Injectable} from '@angular/core';
import {environment} from '@/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Cacheable} from 'ts-cacheable';
import {IncidentI} from '@/interfaces/incident-interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  protected http = inject(HttpClient)

  @Cacheable()
  public fetchIncidentsOverview() {
    return this.http.get<{
      statistics: {
        items: IncidentI[]
        totalInReview: number
        totalItems: number
        totalPending: number
        totalResolved: number
      }
    }>(`${environment.baseUrl}/dashboard`)
  }
}
