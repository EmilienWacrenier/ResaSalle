import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BookingcalendarComponent } from '../../modals/bookingcalendar/bookingcalendar.component';
import { AbsoluteSourceSpan } from '@angular/compiler';
import { read } from 'fs';
import { Room } from '../../classes/room'
import { HomeService } from '../../services/home.service';
import * as moment from 'moment';
import { Booking } from 'src/app/classes/booking';


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

  rooms: Room[];


  constructor(private bookingCalendarDialog: MatDialog, private homeService : HomeService) { }

  itsMorning: boolean;

  ngOnInit() {
    this.initPlanningBtn();
    this.getRooms();
  }

  getRooms(): void{
    this.homeService.getRooms()
      .subscribe(rooms => this.rooms = rooms);
  }
  /* 
    //Méthode pr ouvrir la modale bookingCalendarDialog
    openDialog() {
      const bookingCalendarDialogConfig = new MatDialogConfig();
      bookingCalendarDialogConfig.width = "50%";
      bookingCalendarDialogConfig.height = "50%";
      this.bookingCalendarDialog.open(BookingcalendarComponent, bookingCalendarDialogConfig);
    }
   */

  setReservationParameters(reservation) {
    //demi journee = 5h = 300 minutes
    let maxMinutes = 300;
    //début = 8h donc 8h = 480minutes
    let debutMinutes = 480;

    //total de l'heure de début en minutes
    let hoursDebut = reservation.startDate.getHours();
    let minutesDebut = reservation.startDate.getMinutes();
    let totalMinutesDebut = (hoursDebut * 60 + minutesDebut) - debutMinutes;

    //total de l'heure de fin en minutes
    let hoursFin = reservation.endDate.getHours();
    let minutesFin = reservation.endDate.getMinutes();
    let totalMinutesFin = (hoursFin * 60 + minutesFin) - debutMinutes;

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

  
  getPlanning() {
    if(this.itsMorning){
      this.setBtnAfternoon();
    }
    else{
      this.setBtnMorning();
    }
  }

 initPlanningBtn() {
    if (moment().format("HH:mm") > "13:00") {
      this.setBtnAfternoon();
    }
    else {
      this.setBtnMorning();
    }
  }

  setBtnMorning() {
    this.itsMorning = true;
  }
  setBtnAfternoon() {
    this.itsMorning = false;
  }

  
}