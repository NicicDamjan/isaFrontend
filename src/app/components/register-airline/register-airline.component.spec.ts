import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAirlineComponent } from './register-airline.component';

describe('RegisterAirlineComponent', () => {
  let component: RegisterAirlineComponent;
  let fixture: ComponentFixture<RegisterAirlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAirlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAirlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
