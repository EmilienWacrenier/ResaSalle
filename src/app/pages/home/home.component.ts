import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

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
}
