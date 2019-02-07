import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastHotelResComponent } from './fast-hotel-res.component';

describe('FastHotelResComponent', () => {
  let component: FastHotelResComponent;
  let fixture: ComponentFixture<FastHotelResComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastHotelResComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastHotelResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
