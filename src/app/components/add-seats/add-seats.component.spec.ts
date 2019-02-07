import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSeatsComponent } from './add-seats.component';

describe('AddSeatsComponent', () => {
  let component: AddSeatsComponent;
  let fixture: ComponentFixture<AddSeatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSeatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
