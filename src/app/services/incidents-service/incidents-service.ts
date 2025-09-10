import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@/environments/environment';
import {CreateIncidentI, ImageI, IncidentI} from '@/interfaces/incident-interface';
import {Cacheable} from 'ts-cacheable';
import {forkJoin, map, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  private readonly http = inject(HttpClient);


  // public createIncident(data: CreateIncidentI) {
  //   if (data.images?.length) {
  //     return this.uploadImages(data.images).pipe(
  //       switchMap((fileUrls: string[]) => {
  //         const payload = {
  //           ...data,
  //           imageUrls: fileUrls, // ✅ JSON array of URLs only
  //         };
  //
  //         return this.http.post(
  //           `${environment.baseUrl}/incidents`,
  //           payload,
  //           {headers: {'Content-Type': 'application/json'}}
  //         );
  //       })
  //     );
  //   }
  //
  //   // no images → create directly
  //   return this.http.post(
  //     `${environment.baseUrl}/incidents`,
  //     {...data, images: []},
  //     {headers: {'Content-Type': 'application/json'}}
  //   );
  // }


  public createIncident(data: CreateIncidentI) {
    // Create incident with images
    if (data.images?.length) {
      return this.http.post<{ uploadUrls: { uploadUrl: string; fileUrl: string }[] }>(
        `${environment.baseUrl}/upload-urls`,
        {
          files: data.images.map(img => ({
            name: img.file.name,
            type: img.file.type,
          })),
        },
        {headers: {'Content-Type': 'application/json'}}
      ).pipe(
        switchMap(res =>
          this.uploadFilesToS3(data.images, res.uploadUrls).pipe(
            map(() => res.uploadUrls.map(u => u.fileUrl))
          )
        ),
        switchMap((fileUrls: string[]) => {
          const payload = {...data, imageUrls: fileUrls};
          return this.http.post(
            `${environment.baseUrl}/incidents`,
            payload,
            {headers: {'Content-Type': 'application/json'}}
          );
        })
      );
    }

    // Create incident without images
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
          total: number,
          byStatus: {
            "PENDING": number,
            "RESOLVED": number
            "IN_PROGRESS": number
          }

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

  private uploadFilesToS3(images: ImageI[], uploadUrls: { uploadUrl: string }[]) {
    const uploads = images.map((img, index) =>
      this.http.put(uploadUrls[index].uploadUrl, img.file, {
        headers: {
          'Content-Type': img.file.type,
        },
        responseType: 'text',
      })
    );

    return forkJoin(uploads);
  }

}
