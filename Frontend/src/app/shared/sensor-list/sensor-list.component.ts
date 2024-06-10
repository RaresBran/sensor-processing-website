import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Sensor } from '../../models/sensor';
import { NgForOf, NgClass } from '@angular/common';

@Component({
  selector: 'app-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.scss'],
  standalone: true,
  imports: [NgForOf, NgClass],
})
export class SensorListComponent {
  @Input() sensors: Sensor[] | null = null;
  @Input() selectedSensor: Sensor | undefined;
  @Output() sensorSelected = new EventEmitter<Sensor>();

  selectSensor(sensor: Sensor) {
    this.sensorSelected.emit(sensor);
  }
}
