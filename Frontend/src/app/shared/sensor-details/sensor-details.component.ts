import { Component, Input } from '@angular/core';
import { Sensor } from '../../models/sensor';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-sensor-details',
  templateUrl: './sensor-details.component.html',
  styleUrls: ['./sensor-details.component.scss'],
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
