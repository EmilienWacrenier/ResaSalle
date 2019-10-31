import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-bookingdetails',
  templateUrl: './bookingdetails.component.html',
  styleUrls: ['./bookingdetails.component.scss']
})
export class BookingdetailsComponent implements OnInit {

  constructor( public bookingDetailsDialogRef: MatDialogRef<BookingdetailsComponent> ) { }

  ngOnInit() {
  }

  close() {
    this.bookingDetailsDialogRef.close();
  }

}
