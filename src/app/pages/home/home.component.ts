import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BookingcalendarComponent } from '../../modals/bookingcalendar/bookingcalendar.component';

export interface Periode {
  value: string;
  viewValue: string;
}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class HomeComponent implements OnInit {

  constructor(private bookingCalendarDialog: MatDialog) { }

  ngOnInit() {
  }

  //Méthode pr ouvrir la modale bookingCalendarDialog
  openDialog() {
    const bookingCalendarDialogConfig = new MatDialogConfig();
    bookingCalendarDialogConfig.width = "50%";
    bookingCalendarDialogConfig.height = "50%";
    this.bookingCalendarDialog.open(BookingcalendarComponent, bookingCalendarDialogConfig);
  }


  periodes: Periode[] = [
    {value: 'matin-0', viewValue: 'Matin'},
    {value: 'apresmidi-1', viewValue: 'Après-midi'},
  ];

  tiles: Tile[] = [
    {cols: 1, rows: 1, color: 'rgb(115, 154, 224)'},
    {cols: 1, rows: 1, color: 'lightgrey'},
    {cols: 1, rows: 1, color: 'rgb(115, 154, 224)'},
    {cols: 1, rows: 1, color: 'lightgrey'},
    {cols: 1, rows: 1, color: 'rgb(115, 154, 224)'},
    {cols: 1, rows: 1, color: 'lightgrey'},
    {cols: 1, rows: 1, color: 'rgb(115, 154, 224)'},
    {cols: 1, rows: 1, color: 'lightgrey'},
    {cols: 1, rows: 1, color: 'rgb(115, 154, 224)'},
    {cols: 1, rows: 1, color: 'lightgrey'},
  ];

  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['Nom', 'Planning'];
  expandedElement: Salle | null;
}

export interface Salle {
  Nom: string ;
  Planning : string ;
}

const ELEMENT_DATA: Salle[] = [
  {
    Nom: 'Salle 1',
    Planning: 'test',
  }, {
    Nom: 'Salle 2',
    Planning: 'test',
  }, {
    Nom: 'Salle 3',
    Planning: 'test',
  }, {
    Nom: 'Salle 4',
    Planning: 'test',
  }, {
    Nom: 'Salle 5',
    Planning: 'test',
  }, {
    Nom: 'Salle 6',
    Planning: 'test',
  }, {
    Nom: 'Salle 7',
    Planning: 'test',
  }, {
    Nom: 'Salle 8',
    Planning: 'test',
  }, {
    Nom: 'Salle 9',
    Planning: 'test',
  }, {
    Nom: 'Salle 10',
    Planning: 'test',
  },
];

