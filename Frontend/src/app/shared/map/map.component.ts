import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { tileLayer, marker, icon, Map, Marker, Icon, IconOptions } from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Sensor } from '../../models/sensor';
import { AlertService } from '../../services/services/alert.service';
import { AnomalyStatus } from '../../models/anomaly-status';
import { forkJoin, Observable, of } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  standalone: true,
  imports: [LeafletModule],
})
export class MapComponent implements OnInit, OnDestroy {
  @Input() sensors$: Observable<Sensor[]> = of([]);
  options: any;
  layers: Marker[] = [];
  map: Map | undefined;
  private pollingInterval: any;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '...',
        }),
      ],
      zoom: 15,
      center: [44.442274406003925, 25.934252184085878],
    };

    this.sensors$.subscribe((sensors: Sensor[]) => {
      this.updateMarkers(sensors);
      // Start polling every 5 seconds
      this.pollingInterval = setInterval(() => {
        this.updateMarkers(sensors);
      }, 2000);
    });
  }

  ngOnDestroy() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }

  updateMarkers(sensors: Sensor[]) {
    const anomalyObservables: Observable<AnomalyStatus>[] = sensors.map((sensor: Sensor) =>
      this.alertService.getAnomalyStatus(sensor.id)
    );

    forkJoin(anomalyObservables).subscribe((anomalyStatuses: AnomalyStatus[]) => {
      this.layers = sensors.map((sensor: Sensor, index) => {
        const anomalyStatus: AnomalyStatus = anomalyStatuses[index];
        const hasAnomaly: boolean = anomalyStatus.status;
        const markerIcon: Icon<IconOptions> = icon({
          iconSize: [30, 41],
          iconAnchor: [12, 41],
          iconUrl: hasAnomaly
            ? './../../../assets/red-marker.png'
            : './../../../assets/green-marker.png',
        });

        return marker([sensor.latitude, sensor.longitude], {
          icon: markerIcon,
        }).bindPopup(this.createPopupContent(sensor, anomalyStatus));
      });
    });
  }

  createPopupContent(sensor: Sensor, anomalyStatus: AnomalyStatus): string {
    let anomalyInfo = '';
    if (anomalyStatus.sensorType === 'temp')
      anomalyStatus.sensorType = 'Temperature'
    if (anomalyStatus.status) {
      anomalyInfo = `
        <tr><td>Has Anomaly</td><td>${anomalyStatus.status}</td></tr>
        <tr><td>Anomaly for</td><td>${anomalyStatus.sensorType}</td></tr>
        <tr><td>Value</td><td>${anomalyStatus.value.toFixed(3)}</td></tr>
        <tr><td>Suspicious</td><td>${anomalyStatus.suspicious}</td></tr>
      `;
    }

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
          ${anomalyInfo}
        </tbody>
      </table>
    `;
  }

  onMapReady(map: Map) {
    this.map = map;
  }
}
