import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationReservationRecurrenceComponent } from './confirmation-reservation-recurrence.component';

describe('ConfirmationReservationRecurrenceComponent', () => {
  let component: ConfirmationReservationRecurrenceComponent;
  let fixture: ComponentFixture<ConfirmationReservationRecurrenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationReservationRecurrenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationReservationRecurrenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
