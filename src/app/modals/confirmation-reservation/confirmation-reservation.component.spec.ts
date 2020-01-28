import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationReservationComponent } from './confirmation-reservation.component';

describe('ConfirmationReservationComponent', () => {
  let component: ConfirmationReservationComponent;
  let fixture: ComponentFixture<ConfirmationReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
