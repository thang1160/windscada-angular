import { TestBed } from '@angular/core/testing';

import { PerformanceTrendService } from './performance-trend.service';

describe('PerformanceTrendService', () => {
  let service: PerformanceTrendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerformanceTrendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
