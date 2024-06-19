import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from "../base-service";
import { ApiConfiguration } from "../api-configuration";
import { RequestBuilder } from "../request-builder";
import {AlertEmail} from "../../models/alert-email";

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

  getAnomalyStatus(deviceId: string): Observable<any> {
    const rb = new RequestBuilder(this.rootUrl, `/anomaly-status/${deviceId}`, 'get');
    return this.http.get<any>(rb.build().url);
  }

  updateThresholds(thresholds: any): Observable<any> {
    const rb = new RequestBuilder(this.rootUrl, `/thresholds`, 'post');
    return this.http.post<any>(rb.build().url, thresholds);
  }

  getThresholds(): Observable<any> {
    const rb = new RequestBuilder(this.rootUrl, `/thresholds`, 'get');
    return this.http.get<any>(rb.build().url);
  }

  getAlertEmailList(): Observable<AlertEmail[]> {
    const rb = new RequestBuilder(this.rootUrl, `/emails`, 'get');
    return this.http.get<AlertEmail[]>(rb.build().url);
  }

  addEmailToAlertList(email: AlertEmail): Observable<AlertEmail> {
    const rb = new RequestBuilder(this.rootUrl, `/emails`, 'post');
    return this.http.post<AlertEmail>(rb.build().url, email);
  }

  deleteEmailFromAlertList(email: AlertEmail): Observable<AlertEmail> {
    const rb = new RequestBuilder(this.rootUrl, `/emails`, 'delete');
    return this.http.request<AlertEmail>('delete', rb.build().url, { body: email });
  }
}
