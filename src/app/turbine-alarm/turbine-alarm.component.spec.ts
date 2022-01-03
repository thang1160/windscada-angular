import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurbineAlarmComponent } from './turbine-alarm.component';

describe('TurbineAlarmComponent', () => {
  let component: TurbineAlarmComponent;
  let fixture: ComponentFixture<TurbineAlarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurbineAlarmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurbineAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
