import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingcalendarComponent } from './bookingcalendar.component';

describe('BookingcalendarComponent', () => {
  let component: BookingcalendarComponent;
  let fixture: ComponentFixture<BookingcalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingcalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingcalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
