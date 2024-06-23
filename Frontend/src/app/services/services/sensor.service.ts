import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
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
    const rb = new RequestBuilder(this.rootUrl, '/app/sensors', 'get');
    return this.http.get<Sensor[]>(rb.build().url);
  }
}
