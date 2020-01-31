import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BookingcalendarComponent } from '../../modals/bookingcalendar/bookingcalendar.component';
import { AbsoluteSourceSpan } from '@angular/compiler';
import { read } from 'fs';
import { Room } from '../../classes/room'
import { RoomService } from '../../services/room.service';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { PlanningService } from 'src/app/services/planning.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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

  constructor(
    private roomService: RoomService,
    private planningService : PlanningService) 
    { }


  ngOnInit() {
    this.initPlanningBtn();
    this.getRoomsAndTheirReservationsOfToday();
  }

  onClickRoom(roomId : number){
    console.log(roomId);
    this.planningService.getRoomId(roomId);
  }

  initPlanningBtn() {
    if (new Date().getHours() >= 13) {
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
    let hoursDebut = new Date(reservation.startDate).getHours();
    console.log(hoursDebut);
    
    let minutesDebut = (new Date(reservation.startDate)).getMinutes();
    let totalHoursDebut = hoursDebut*60 + minutesDebut;

    //total de l'heure de fin en minutes
    let hoursFin = (new Date(reservation.endDate)).getHours();
    let minutesFin = (new Date(reservation.endDate)).getMinutes();
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