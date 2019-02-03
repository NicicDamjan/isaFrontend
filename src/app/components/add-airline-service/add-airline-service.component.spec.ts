import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAirlineServiceComponent } from './add-airline-service.component';

describe('AddAirlineServiceComponent', () => {
  let component: AddAirlineServiceComponent;
  let fixture: ComponentFixture<AddAirlineServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAirlineServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAirlineServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
