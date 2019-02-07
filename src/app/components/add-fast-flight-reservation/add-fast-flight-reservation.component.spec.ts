import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFastFlightReservationComponent } from './add-fast-flight-reservation.component';

describe('AddFastFlightReservationComponent', () => {
  let component: AddFastFlightReservationComponent;
  let fixture: ComponentFixture<AddFastFlightReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFastFlightReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFastFlightReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
