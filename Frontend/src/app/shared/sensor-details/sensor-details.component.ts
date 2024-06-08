import { Component, Input } from '@angular/core';
import { Sensor } from '../../models/sensor';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-sensor-details',
  template: `
    <div class="row mt-4" *ngIf="selectedSensor">
      <div class="col-md-8 offset-md-2">
        <iframe title="" [src]="getAdditionalPanelsUrl(selectedSensor.id, 14)" width="100%" height="200"></iframe>
      </div>
      <div class="col-md-4">
        <iframe title="" [src]="getAdditionalPanelsUrl(selectedSensor.id, 13)" width="100%" height="200"></iframe>
      </div>
      <div class="col-md-4">
        <iframe title="" [src]="getAdditionalPanelsUrl(selectedSensor.id, 10)" width="100%" height="200"></iframe>
      </div>
      <div class="col-md-4">
        <iframe title="" [src]="getAdditionalPanelsUrl(selectedSensor.id, 9)" width="100%" height="200"></iframe>
      </div>
      <div class="col-md-6" *ngFor="let field of fields">
        <iframe title="" [src]="getSafeUrl(selectedSensor.id, field)" width="100%" height="200"></iframe>
      </div>
    </div>
  `,
  standalone: true,
  imports: [NgForOf, NgIf],
})
export class SensorDetailsComponent {
  @Input() selectedSensor: Sensor | undefined;
  @Input() selectedTimeRange: string = '';
  @Input() fields: any[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  getSafeUrl(sensorId: string, field: any): SafeResourceUrl {
    const baseUrl = `http://localhost:3000/d-solo/cdmkscis1vlkwb?orgId=1&from=${this.selectedTimeRange}&to=now&var-sensorId=${sensorId}&refresh=5s&theme=light`;
    const url = `${baseUrl}&panelId=${field.panelId}&var-measure=${field.name}&var-title=${field.title}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getAdditionalPanelsUrl(sensorId: string, panelId: number): SafeResourceUrl {
    const url = `http://localhost:3000/d-solo/cdmkscis1vlkwb?orgId=1&from=${this.selectedTimeRange}&to=now&var-sensorId=${sensorId}&refresh=5s&theme=light&panelId=${panelId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
