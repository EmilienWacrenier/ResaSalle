import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-bookingcalendar',
  templateUrl: './bookingcalendar.component.html',
  styleUrls: ['./bookingcalendar.component.scss']
})
export class BookingcalendarComponent implements OnInit {

  constructor(public bookingCalendarDialogRef: MatDialogRef<BookingcalendarComponent>) { }

  ngOnInit() {
  }

}
