import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceTrendComponent } from './performance-trend.component';

describe('PerformanceTrendComponent', () => {
  let component: PerformanceTrendComponent;
  let fixture: ComponentFixture<PerformanceTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceTrendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
