import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BookingcalendarComponent } from 'src/app/modals/bookingcalendar/bookingcalendar.component';

export interface Periode {
  value: string;
  viewValue: string;
}

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

  constructor(private bookingCalendarDialog: MatDialog) { }

  ngOnInit() {
  }
  periodes: Periode[] = [
    {value: 'matin-0', viewValue: 'Matin'},
    {value: 'apresmidi-1', viewValue: 'Après-midi'},
  ];
<<<<<<< HEAD

  //Méthode pr ouvrir la modale bookingCalendarDialog
  openDialog() {
    const bookingCalendarDialogConfig = new MatDialogConfig();
    bookingCalendarDialogConfig.width = "50%";
    bookingCalendarDialogConfig.height = "50%";
    this.bookingCalendarDialog.open(BookingcalendarComponent, bookingCalendarDialogConfig);
  }
=======
>>>>>>> e50eb28c4f77be400502423d4190316f5f4bb3ff
}
