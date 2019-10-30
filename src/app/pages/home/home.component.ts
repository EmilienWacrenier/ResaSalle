import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookingcalendarComponent } from '../../modals/bookingcalendar/bookingcalendar.component';

export interface Periode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { } // dialog->modale bookingCalendar

  ngOnInit() {
  }
  periodes: Periode[] = [
    {value: 'matin-0', viewValue: 'Matin'},
    {value: 'apresmidi-1', viewValue: 'Après-midi'},
  ];

  //Modale bookingCalendar
  openBookingCalendar(): void {
    const dialogRef = this.dialog.open(BookingcalendarComponent, {
      width: '250px',
      //data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }
}
