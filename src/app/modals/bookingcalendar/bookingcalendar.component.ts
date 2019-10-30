import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { BookingdetailsComponent } from 'src/app/modals/bookingdetails/bookingdetails.component';

@Component({
  selector: 'app-bookingcalendar',
  templateUrl: './bookingcalendar.component.html',
  styleUrls: ['./bookingcalendar.component.scss']
})
export class BookingcalendarComponent implements OnInit {

  constructor( private bookingDetailsDialog: MatDialog, public bookingCalendarDialogRef: MatDialogRef<BookingcalendarComponent>) { }

  ngOnInit() {
  }
  //fermeture de la modale avec DialogRef
  next() {
    this.bookingCalendarDialogRef.close();
  }

}
