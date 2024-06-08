import { Component, OnInit } from '@angular/core';
import { SensorService } from '../../services/services/sensor.service';
import { Sensor } from '../../models/sensor';
import { NgForOf, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MapComponent} from "../../shared/map/map.component";
import {SensorListComponent} from "../../shared/sensor-list/sensor-list.component";
import {SensorDetailsComponent} from "../../shared/sensor-details/sensor-details.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [NgForOf, NgIf, NgClass, FormsModule, MapComponent, SensorListComponent, SensorDetailsComponent],
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  sensors: Sensor[] = [];
  selectedTimeRange = 'now-6h'; // default time range start
  selectedSensor: Sensor | undefined;

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

  constructor(private sensorService: SensorService) {}

  ngOnInit() {
    this.sensorService.getAllSensors().subscribe((sensors) => {
      this.sensors = sensors;
    });
  }

  updateTimeRange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedTimeRange = target.value;
  }

  selectSensor(sensor: Sensor) {
    this.selectedSensor = sensor;
  }
}
