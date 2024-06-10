import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Thresholds } from '../../models/thresholds';
import { AlertService } from "../../services/services/alert.service";
import { NgClass, NgForOf } from "@angular/common";

@Component({
  selector: 'app-threshold-settings',
  templateUrl: './threshold-settings.component.html',
  standalone: true,
  imports: [
    NgClass,
    ReactiveFormsModule,
    NgForOf
  ],
  styleUrls: ['./threshold-settings.component.scss']
})
export class ThresholdSettingsComponent implements OnInit {
  @Input() fields: { name: string, title: string }[] = [];
  thresholdForm: FormGroup;
  isCollapsed = true;  // Initial state of the collapse

  constructor(private fb: FormBuilder, private anomalyService: AlertService) {
    this.thresholdForm = this.fb.group({
      humidityUpper: [''],
      humidityLower: [''],
      temperatureUpper: [''],
      temperatureLower: [''],
      coUpper: [''],
      coLower: [''],
      lpgUpper: [''],
      lpgLower: [''],
      smokeUpper: [''],
      smokeLower: ['']
    });
  }

  ngOnInit(): void {
    this.anomalyService.getThresholds().subscribe((thresholds: Thresholds) => {
      this.thresholdForm.patchValue({
        humidityUpper: thresholds.humidityUpper,
        humidityLower: thresholds.humidityLower,
        temperatureUpper: thresholds.temperatureUpper,
        temperatureLower: thresholds.temperatureLower,
        coUpper: thresholds.coUpper,
        coLower: thresholds.coLower,
        lpgUpper: thresholds.lpgUpper,
        lpgLower: thresholds.lpgLower,
        smokeUpper: thresholds.smokeUpper,
        smokeLower: thresholds.smokeLower
      });
    });
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  onSubmit() {
    if (this.thresholdForm.valid) {
      const thresholds: Thresholds = {
        humidityUpper: this.thresholdForm.value.humidityUpper,
        humidityLower: this.thresholdForm.value.humidityLower,
        temperatureUpper: this.thresholdForm.value.temperatureUpper,
        temperatureLower: this.thresholdForm.value.temperatureLower,
        coUpper: this.thresholdForm.value.coUpper,
        coLower: this.thresholdForm.value.coLower,
        lpgUpper: this.thresholdForm.value.lpgUpper,
        lpgLower: this.thresholdForm.value.lpgLower,
        smokeUpper: this.thresholdForm.value.smokeUpper,
        smokeLower: this.thresholdForm.value.smokeLower
      };
      this.anomalyService.updateThresholds(thresholds).subscribe(response => {
        console.log('Thresholds updated successfully');
      });
    }
  }
}
