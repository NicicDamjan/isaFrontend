import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAirlineConfigurationComponent } from './add-airline-configuration.component';

describe('AddAirlineConfigurationComponent', () => {
  let component: AddAirlineConfigurationComponent;
  let fixture: ComponentFixture<AddAirlineConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAirlineConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAirlineConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
