import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastFlightReservationsComponent } from './fast-flight-reservations.component';

describe('FastFlightReservationsComponent', () => {
  let component: FastFlightReservationsComponent;
  let fixture: ComponentFixture<FastFlightReservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastFlightReservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastFlightReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
