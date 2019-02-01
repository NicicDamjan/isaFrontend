import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelServicesComponent } from './hotel-services.component';

describe('HotelServicesComponent', () => {
  let component: HotelServicesComponent;
  let fixture: ComponentFixture<HotelServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
