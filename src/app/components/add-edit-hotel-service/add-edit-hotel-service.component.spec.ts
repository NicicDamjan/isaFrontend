import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditHotelServiceComponent } from './add-edit-hotel-service.component';

describe('AddEditHotelServiceComponent', () => {
  let component: AddEditHotelServiceComponent;
  let fixture: ComponentFixture<AddEditHotelServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditHotelServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditHotelServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
