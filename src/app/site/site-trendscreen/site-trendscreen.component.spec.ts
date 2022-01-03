import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteTrendscreenComponent } from './site-trendscreen.component';

describe('SiteTrendscreenComponent', () => {
  let component: SiteTrendscreenComponent;
  let fixture: ComponentFixture<SiteTrendscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteTrendscreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteTrendscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
