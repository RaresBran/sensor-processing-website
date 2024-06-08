import { Component, OnInit, Input } from '@angular/core';
import { tileLayer, marker, icon, Map, Marker } from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Sensor } from '../../models/sensor';

@Component({
  selector: 'app-map',
  template: `<div leaflet style="height: 500px;" [leafletOptions]="options" [leafletLayers]="layers" (leafletMapReady)="onMapReady($event)"></div>`,
  standalone: true,
  imports: [LeafletModule],
})
export class MapComponent implements OnInit {
  @Input() sensors: Sensor[] = [];
  options: any;
  layers: Marker[] = [];
  map: Map | undefined;

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

    this.layers = this.sensors.map((sensor) =>
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
}
