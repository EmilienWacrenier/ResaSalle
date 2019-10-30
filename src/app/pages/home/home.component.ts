import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
//import { BookingcalendarComponent } from 'src/app/app.module';

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

  //Méthode pr ouvrir la modale bookingCalendarDialog
  openDialog() {
    const bookingCalendarDialogConfig = new MatDialogConfig();
    bookingCalendarDialogConfig.width = "150px";
    bookingCalendarDialogConfig.heigth = "250px";
    this.bookingCalendarDialog.open(BookingcalendarComponent, dialogConfig);
  }
}
