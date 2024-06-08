import { Component, OnInit } from '@angular/core';
import { tileLayer, marker, icon, Map, Marker } from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SensorService } from '../../services/services/sensor.service';
import { Sensor } from '../../models/sensor';
import { NgForOf, NgIf, NgClass } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [LeafletModule, NgForOf, NgIf, FormsModule, NgClass],
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  options: any;
  layers: Marker[] = [];
  map: Map | undefined;
  sensors: Sensor[] = [];
  fromTime: string = 'now-6h'; // default time range start
  toTime: string = 'now'; // default time range end

  timeRanges = [
    { label: 'Last 5 minutes', value: 'now-5m' },
    { label: 'Last 15 minutes', value: 'now-15m' },
    { label: 'Last 30 minutes', value: 'now-30m' },
    { label: 'Last 1 hour', value: 'now-1h' },
    { label: 'Last 3 hours', value: 'now-3h' },
    { label: 'Last 6 hours', value: 'now-6h' },
    { label: 'Last 12 hours', value: 'now-12h' },
    { label: 'Last 24 hours', value: 'now-24h' },
    { label: 'Last 2 days', value: 'now-2d' },
  ];

  fields = [
    { name: 'humidity', title: 'Humidity', panelId: 2 },
    { name: 'temperature', title: 'Temperature', panelId: 12 },
    { name: 'co', title: 'CO Levels', panelId: 11 },
    { name: 'lpg', title: 'LPG Levels', panelId: 11 },
    { name: 'smoke', title: 'Smoke Levels', panelId: 11 },
  ];
  selectedTimeRange = this.timeRanges[5].value;
  selectedSensor: Sensor | undefined;

  constructor(private sensorService: SensorService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '...',
        }),
      ],
      zoom: 12,
      center: [44.423396, 26.103240],
    };

    this.sensorService.getAllSensors().subscribe((sensors) => {
      this.sensors = sensors;
      this.layers = sensors.map((sensor) =>
        marker([sensor.latitude, sensor.longitude], {
          icon: icon({
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            iconUrl:
              'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl:
              'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
          }),
        }).bindPopup(this.createPopupContent(sensor))
      );
    });
  }

  createPopupContent(sensor: Sensor): string {
    return `
      <table class="table table-striped table-bordered">
        <thead>
          <tr><th colspan="2" class="text-center">${sensor.name}</th></tr>
        </thead>
        <tbody>
          <tr><td>ID</td><td>${sensor.id}</td></tr>
          <tr><td>Longitude</td><td>${sensor.longitude}</td></tr>
          <tr><td>Latitude</td><td>${sensor.latitude}</td></tr>
          <tr><td>Region</td><td>${sensor.region}</td></tr>
        </tbody>
      </table>
    `;
  }

  onMapReady(map: Map) {
    this.map = map;
  }

  updateTimeRange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedTimeRange = target.value;
  }

  selectSensor(sensor: Sensor) {
    this.selectedSensor = sensor;
  }

  getSafeUrl(sensorId: string, field: any): SafeResourceUrl {
    const baseUrl = `http://localhost:3000/d-solo/cdmkscis1vlkwb?orgId=1&from=${this.selectedTimeRange}&to=${this.toTime}&var-sensorId=${sensorId}&refresh=5s&theme=light`;
    const url = `${baseUrl}&panelId=${field.panelId}&var-measure=${field.name}&var-title=${field.title}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getAdditionalPanelsUrl(sensorId: string, panelId: number): SafeResourceUrl {
    const url = `http://localhost:3000/d-solo/cdmkscis1vlkwb?orgId=1&from=${this.selectedTimeRange}&to=${this.toTime}&var-sensorId=${sensorId}&refresh=5s&theme=light&panelId=${panelId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
