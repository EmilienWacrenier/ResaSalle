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
    //fermeture de la 1ere modale
    this.bookingCalendarDialogRef.close();
    //config et ouverture de la 2eme test_modaleconst bookingCalendarDialogConfig = new MatDialogConfig();
    const bookingDetailsDialogConfig = new MatDialogConfig();
    bookingDetailsDialogConfig.width = "30%";
    bookingDetailsDialogConfig.height = "80%";
    this.bookingDetailsDialog.open(BookingdetailsComponent, bookingDetailsDialogConfig);
  }

}
