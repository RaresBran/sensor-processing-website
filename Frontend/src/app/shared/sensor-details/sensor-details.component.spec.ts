import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorDetailsComponent } from './sensor-details.component';

describe('SensorDetailsComponent', () => {
  let component: SensorDetailsComponent;
  let fixture: ComponentFixture<SensorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SensorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
