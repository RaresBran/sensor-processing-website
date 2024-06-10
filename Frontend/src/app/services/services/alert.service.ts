import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {BaseService} from "../base-service";
import {ApiConfiguration} from "../api-configuration";
import {RequestBuilder} from "../request-builder";
import {AnomalyStatus} from "../../models/anomaly-status";
import {Thresholds} from "../../models/thresholds";

@Injectable({
  providedIn: 'root',
})
export class AlertService extends BaseService {

  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  getAnomalyStatus(deviceId: string): Observable<AnomalyStatus> {
    const rb = new RequestBuilder(this.rootUrl, `/anomaly-status/${deviceId}`, 'get');
    return this.http.get<AnomalyStatus>(rb.build().url);
  }

  updateThresholds(thresholds: Thresholds): Observable<Thresholds> {
    const rb = new RequestBuilder(this.rootUrl, `/thresholds`, 'post');
    return this.http.post<Thresholds>(rb.build().url, thresholds);
  }

  getThresholds(): Observable<Thresholds> {
    const rb = new RequestBuilder(this.rootUrl, `/thresholds`, 'get');
    return this.http.get<Thresholds>(rb.build().url);
  }
}
