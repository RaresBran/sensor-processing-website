import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { Sensor } from '../../models/sensor';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-sensor-details',
  templateUrl: './sensor-details.component.html',
  standalone: true,
  imports: [NgForOf, NgIf],
})
export class SensorDetailsComponent {
  @Input() selectedSensor: Sensor | undefined;
  @Input() selectedTimeRange: string = '';
  @Input() fields: any[] = [];

  iframeUrls: SafeResourceUrl[] = [];

  constructor(private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) {}

  ngOnChanges() {
    this.updateIframeUrls();
  }

  updateIframeUrls() {
    if (this.selectedSensor) {
      this.iframeUrls = this.fields.map(field => this.getSafeUrl(this.selectedSensor!.id, field));
      this.cdr.detectChanges();
    }
  }

  getSafeUrl(sensorId: string, field: any): SafeResourceUrl {
    const baseUrl = `http://localhost:3000/d-solo/cdmkscis1vlkwb?orgId=1&from=${this.selectedTimeRange}&to=now&var-deviceId=${sensorId}&refresh=auto&theme=light`;
    const url = `${baseUrl}&panelId=${field.panelId}&var-measure=${field.name}&var-title=${field.title}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getAdditionalPanelsUrl(sensorId: string, panelId: number): SafeResourceUrl {
    const url = `http://localhost:3000/d-solo/cdmkscis1vlkwb?orgId=1&from=${this.selectedTimeRange}&to=now&var-deviceId=${sensorId}&refresh=auto&theme=light&panelId=${panelId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  trackByField(index: number, field: any): string {
    return field.name;
  }
}
