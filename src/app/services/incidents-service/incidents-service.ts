import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@/environments/environment';
import {CreateIncidentI, ImageI, IncidentI} from '@/interfaces/incident-interface';
import {Cacheable} from 'ts-cacheable';
import {map, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  private readonly http = inject(HttpClient);


  public createIncident(data: CreateIncidentI) {
    if (data.images?.length) {
      return this.uploadImages(data.images).pipe(
        switchMap((fileUrls: string[]) => {
          const payload = {
            ...data,
            imageUrls: fileUrls, // ✅ JSON array of URLs only
          };

          return this.http.post(
            `${environment.baseUrl}/incidents`,
            payload,
            {headers: {'Content-Type': 'application/json'}}
          );
        })
      );
    }

    // no images → create directly
    return this.http.post(
      `${environment.baseUrl}/incidents`,
      {...data, images: []},
      {headers: {'Content-Type': 'application/json'}}
    );
  }


  @Cacheable()
  public fetchUserIncidents() {
    return this.http.get<
      {
        incidents: IncidentI[]
        summary: {
          total: number

        }
      }
    >(`${environment.baseUrl}/incidents/mine`)
  }

  @Cacheable()
  public fetchIncidents() {
    return this.http.get<{ incidents: IncidentI[] }>(`${environment.baseUrl}/incidents`)
  }

  public updateIncidentStatus(incidentId: string, statusUpdate: { comments: string, status: string }) {
    return this.http.put<{
      incident: IncidentI,
      message: string
    }>(`${environment.baseUrl}/incidents/${incidentId}/status`, statusUpdate);
  }

  private uploadImages(images: ImageI[]) {
    const filenames = images.map(img => img.file.name);

    return this.http.post<{ uploadUrls: { fileUrl: string }[] }>(
      `${environment.baseUrl}/upload-urls`,
      {files: filenames},
      {headers: {'Content-Type': 'application/json'}}
    ).pipe(
      map(res => res.uploadUrls.map(u => u.fileUrl)) // now typed as string[]
    );
  }


}
