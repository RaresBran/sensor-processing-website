import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {forkJoin, map, Observable} from 'rxjs';
import {BaseService} from "../base-service";
import {ApiConfiguration} from "../api-configuration";
import {RequestBuilder} from "../request-builder";
import {Sensor} from "../../models/sensor";

@Injectable({
  providedIn: 'root'
})
export class SensorService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  getAllSensors(): Observable<Sensor[]> {
    const rb = new RequestBuilder(this.rootUrl, '/sensors', 'get');
    return this.http.get<Sensor[]>(rb.build().url);
  }

  getAnomalyStatus(sensorIds: string[]): Observable<{ [key: string]: boolean }> {
    const requests = sensorIds.map((id) =>
      this.http.get<{ status: boolean }>(`${this.rootUrl}/anomaly-status/${id}`)
    );
    return forkJoin(requests).pipe(
      map((responses) => {
        const statusMap: { [key: string]: boolean } = {};
        responses.forEach((response, index) => {
          statusMap[sensorIds[index]] = response.status;
        });
        return statusMap;
      })
    );
  }
}
