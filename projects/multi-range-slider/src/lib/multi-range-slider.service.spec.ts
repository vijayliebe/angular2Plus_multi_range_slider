import { TestBed } from '@angular/core/testing';

import { MultiRangeSliderService } from './multi-range-slider.service';

describe('MultiRangeSliderService', () => {
  let service: MultiRangeSliderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiRangeSliderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
