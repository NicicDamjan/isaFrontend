import { TestBed, inject } from '@angular/core/testing';

import { SeatServiceService } from './seat-service.service';

describe('SeatServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeatServiceService]
    });
  });

  it('should be created', inject([SeatServiceService], (service: SeatServiceService) => {
    expect(service).toBeTruthy();
  }));
});
