import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteBarGraphComponent } from './site-bar-graph.component';

describe('SiteBarGraphComponent', () => {
  let component: SiteBarGraphComponent;
  let fixture: ComponentFixture<SiteBarGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteBarGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
