import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAllHotelsForReservationComponent } from './display-all-hotels-for-reservation.component';

describe('DisplayAllHotelsForReservationComponent', () => {
  let component: DisplayAllHotelsForReservationComponent;
  let fixture: ComponentFixture<DisplayAllHotelsForReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayAllHotelsForReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAllHotelsForReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
