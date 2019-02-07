import { TestBed, inject } from '@angular/core/testing';

import { FastFlightReservationsService } from './fast-flight-reservations.service';

describe('FastFlightReservationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FastFlightReservationsService]
    });
  });

  it('should be created', inject([FastFlightReservationsService], (service: FastFlightReservationsService) => {
    expect(service).toBeTruthy();
  }));
});
