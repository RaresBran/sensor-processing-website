import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from "../base-service";
import { ApiConfiguration } from "../api-configuration";
import { RequestBuilder } from "../request-builder";
import { AlertEmail } from "../../models/alert-email";

@Injectable({
  providedIn: 'root',
})
export class AlertService extends BaseService {
  private baseUrl: string = `${this.apiConfiguration.rootUrl}/app/alert`;

  constructor(
    private apiConfiguration: ApiConfiguration,
    http: HttpClient
  ) {
    super(apiConfiguration, http);
  }

  getAnomalyStatus(deviceId: string): Observable<any> {
    const rb = new RequestBuilder(this.baseUrl, `/anomaly-status/${deviceId}`, 'get');
    return this.http.get<any>(rb.build().url);
  }

  updateThresholds(thresholds: any): Observable<any> {
    const rb = new RequestBuilder(this.baseUrl, `/thresholds`, 'post');
    return this.http.post<any>(rb.build().url, thresholds);
  }

  getThresholds(): Observable<any> {
    const rb = new RequestBuilder(this.baseUrl, `/thresholds`, 'get');
    return this.http.get<any>(rb.build().url);
  }

  getAlertEmailList(): Observable<AlertEmail[]> {
    const rb = new RequestBuilder(this.baseUrl, `/emails`, 'get');
    return this.http.get<AlertEmail[]>(rb.build().url);
  }

  addEmailToAlertList(email: AlertEmail): Observable<AlertEmail> {
    const rb = new RequestBuilder(this.baseUrl, `/emails`, 'post');
    return this.http.post<AlertEmail>(rb.build().url, email).pipe(
      catchError(this.handleError)
    );
  }

  deleteEmailFromAlertList(email: AlertEmail): Observable<AlertEmail> {
    const rb = new RequestBuilder(this.baseUrl, `/emails`, 'delete');
    return this.http.delete<AlertEmail>(rb.build().url, { body: email });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      if (error.status === 409) {
        errorMessage = 'Email already exists!';
      } else if (error.status === 400) {
        errorMessage = 'Invalid email format!';
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
