import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BookingcalendarComponent } from '../../modals/bookingcalendar/bookingcalendar.component';
import { AbsoluteSourceSpan } from '@angular/compiler';
import { read } from 'fs';
import { Room } from '../../classes/room'
import { HomeService } from '../../services/home.service';
import { RoomService } from '../../services/room.service';
import * as moment from 'moment';
import { Observable } from 'rxjs';


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
  rooms$: Observable<Room[]>;

  /* 
    Variable itsMorning
    Checks the period of half-day to display
    TRUE => Displays morning planning
    FALSE => Displays afternoon planning
  */
  itsMorning: boolean;

  constructor(private roomService: RoomService) { }


  ngOnInit() {
    this.initPlanningBtn();
    this.getRoomsAndTheirReservationsOfToday();
  }

  initPlanningBtn() {
    if (new Date().getUTCHours() >= 13) {
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

  getBtnMorning() {
    if (this.itsMorning) {
      this.setBtnAfternoon();
      this.getRoomsAndTheirReservationsOfToday();
    }
    else {
      this.setBtnMorning();
      this.getRoomsAndTheirReservationsOfToday();
    }
  }

  getRoomsAndTheirReservationsOfToday() {
    this.roomService.getRoomsAndTheirReservationsOfToday()
      .subscribe(rooms => {
        this.rooms = rooms;
        console.log(rooms)
      });
  }

  reservationDuringMorning(date){
    let now = new Date(date).getHours();
    if (now > 13) { return false; }
    else return true;
  }

  setReservationParameters(reservation) {
    let maxMinutes = 300; //5h (demi journée)
    let startMinutes;

    //total de l'heure de début en minutes
    let hoursDebut = new Date(reservation.startDate).getUTCHours();
    let minutesDebut = (new Date(reservation.startDate)).getUTCMinutes();
    let totalHoursDebut = hoursDebut*60 + minutesDebut;

    //total de l'heure de fin en minutes
    let hoursFin = (new Date(reservation.endDate)).getUTCHours();
    let minutesFin = (new Date(reservation.endDate)).getUTCMinutes();
    let totalHoursFin = hoursFin*60 + minutesFin;

    //début et fin le matin
    if(hoursDebut < 13 && this.itsMorning) {
      //début = 8h donc 8h = 480minutes
      startMinutes = 480;
      if(hoursFin >= 13){ totalHoursFin = 780; }
    }
    //début l'aprem et fin l'aprem
    else if (hoursDebut >= 13 && !this.itsMorning) {
      //début = 13h donc 13h = 780minutes
      startMinutes = 780;
    }
    else if(hoursDebut < 13 && hoursFin >= 13 && !this.itsMorning ){
      //début = 13h donc 13h = 780minutes
      startMinutes = 780;
      totalHoursDebut = 780;
    }

    totalHoursDebut = totalHoursDebut - startMinutes;
    totalHoursFin = totalHoursFin - startMinutes;

    //calcul de la marge(décalage) en fonction de l'heure de début
    let leftMargin = totalHoursDebut * 100 / maxMinutes;

    //calcul de la taille de la réservation en fonction de l'heure de fin
    let bookingDuration = (totalHoursFin - totalHoursDebut) * 100 / maxMinutes;
    let styles = {
      'left.%': leftMargin,
      'width.%': bookingDuration,
    };
    return styles;
    
  }
}