import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BookingcalendarComponent } from '../../modals/bookingcalendar/bookingcalendar.component';
import { AbsoluteSourceSpan } from '@angular/compiler';
import { read } from 'fs';

/* export interface Periode {
  value: string;
  viewValue: string;
}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
}

export interface Periode {
  value: string;
  viewValue: string;
} */

export interface Reservation {
  id: number;
  dateDebut: Date;
  dateFin: Date;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class HomeComponent implements OnInit {

  constructor(private bookingCalendarDialog: MatDialog) { }

  ngOnInit() {
    console.log(this.reservations);
  }
  /* 
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
  ]; */


  reservations: Reservation[] = [
    {
      id: 1,
      dateDebut: new Date("2019-11-06 08:00:00"),
      dateFin: new Date("2019-11-06 08:37:00"),
    }, {
      id: 2,
      dateDebut: new Date("2019-11-06 09:00:00"),
      dateFin: new Date("2019-11-06 10:00:00"),
    }, {
      id: 3,
      dateDebut: new Date("2019-11-06 11:15:00"),
      dateFin: new Date("2019-11-06 11:45:00"),
    }, {
      id: 4,
      dateDebut: new Date("2019-11-06 12:00:00"),
      dateFin: new Date("2019-11-06 12:56:00"),
    }
  ];

  setReservationParameters(reservation) {
      //demi journee = 5h = 300 minutes
      let maxMinutes = 300;
      //début = 8h donc 8h = 480minutes
      let debutMinutes = 480;

      //total de l'heure de début en minutes
      let hoursDebut = reservation.dateDebut.getHours();
      let minutesDebut = reservation.dateDebut.getMinutes();
      let totalMinutesDebut = (hoursDebut*60 + minutesDebut) - debutMinutes;

      //total de l'heure de fin en minutes
      let hoursFin = reservation.dateFin.getHours();
      let minutesFin = reservation.dateFin.getMinutes();
      let totalMinutesFin = (hoursFin*60 + minutesFin) - debutMinutes;

      //calcul de la marge(décalage) en fonction de l'heure de début
      let margeGauche = totalMinutesDebut * 100 / maxMinutes;

      //calcul de la taille de la réservation en fonction de l'heure de fin
      let dureeResa = (totalMinutesFin - totalMinutesDebut) * 100 / maxMinutes;

      let styles = {
        'left.%': margeGauche,
        'width.%': dureeResa,
      };
      return styles;
    }

}