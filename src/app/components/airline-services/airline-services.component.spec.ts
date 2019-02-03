import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineServicesComponent } from './airline-services.component';

describe('AirlineServicesComponent', () => {
  let component: AirlineServicesComponent;
  let fixture: ComponentFixture<AirlineServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
