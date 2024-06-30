import { Component, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { Sensor } from '../../models/sensor';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-sensor-details',
  templateUrl: './sensor-details.component.html',
  standalone: true,
  imports: [NgForOf, NgIf],
})
export class SensorDetailsComponent implements OnChanges {
  @Input() selectedSensor: Sensor | undefined;
  @Input() selectedTimeRange: string = '';
  @Input() fields: any[] = [];

  iframeUrls: SafeResourceUrl[] = [];
  additionalPanelUrls: { [key: number]: SafeResourceUrl } = {};

  constructor(private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) {}

  ngOnChanges() {
    if (this.selectedSensor) {
      this.updateStaticIframeUrls();
      this.updateDynamicIframeUrls();
    }
  }

  updateStaticIframeUrls() {
    const panelIds = [19, 20, 22, 9];
    panelIds.forEach(panelId => {
      this.additionalPanelUrls[panelId] = this.getSafeUrl(this.selectedSensor!.id, panelId);
    });
  }

  updateDynamicIframeUrls() {
    this.iframeUrls = this.fields.map(field => this.getSafeUrl(this.selectedSensor!.id, field.panelId, field));
    this.cdr.detectChanges();
  }

  getSafeUrl(sensorId: string, panelId: number, field?: any): SafeResourceUrl {
    const baseUrl = `http://localhost:3000/d-solo/cdmkscis1vlkwb?orgId=1&from=${this.selectedTimeRange}&to=now&var-deviceId=${sensorId}&refresh=auto&theme=light`;
    const url = field
      ? `${baseUrl}&panelId=${panelId}&var-measure=${field.name}&var-title=${field.title}`
      : `${baseUrl}&panelId=${panelId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  trackByField(index: number, field: any): string {
    return field.name;
  }
}
