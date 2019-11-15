import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BookingcalendarComponent } from '../../modals/bookingcalendar/bookingcalendar.component';
import { AbsoluteSourceSpan } from '@angular/compiler';
import { read } from 'fs';
import { Room } from '../../classes/room'
import { HomeService } from '../../services/home.service';
import * as moment from 'moment';


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

  /* 
    Variable itsMorning
    Checks the period of half-day to display
    TRUE => Displays morning planning
    FALSE => Displays afternoon planning
  */
  itsMorning: boolean;

  constructor(private homeService: HomeService) { }


  ngOnInit() {
    this.initPlanningBtn();
    this.getRooms();
  }

  getRooms(): void {
    this.homeService.getRooms()
      .subscribe(rooms => this.rooms = rooms);
  }

  reservationDuringMorning(dateString){
    let date = new Date(dateString).getHours();
    if (date > 13) { return false; }
    else return true;
  }

  setReservationParameters(reservation) {
    let maxMinutes;
    let startMinutes;

    if (this.itsMorning) {
      //demi journee = 5h = 300 minutes
      maxMinutes = 300;
      //début = 8h donc 8h = 480minutes
      startMinutes = 480;
    }
    else{
      //demi journee = 5h = 300 minutes
      maxMinutes = 300;
      //début = 13h donc 13h = 780minutes
      startMinutes = 780;
    }

    //total de l'heure de début en minutes
    let startHourBooking = new Date(reservation.startDate).getHours();
    let startMinuteBooking = (new Date(reservation.startDate)).getMinutes();
    let totalMinutesDebut = (startHourBooking * 60 + startMinuteBooking) - startMinutes;
    console.log(totalMinutesDebut);

    //total de l'heure de fin en minutes
    let hoursFin = (new Date(reservation.endDate)).getHours();
    let minutesFin = (new Date(reservation.endDate)).getMinutes();
    let totalMinutesFin = (hoursFin * 60 + minutesFin) - startMinutes;
    console.log(totalMinutesFin);

    //calcul de la marge(décalage) en fonction de l'heure de début
    let leftMargin = totalMinutesDebut * 100 / maxMinutes;
    console.log(leftMargin);
    //calcul de la taille de la réservation en fonction de l'heure de fin
    let bookingDuration = (totalMinutesFin - totalMinutesDebut) * 100 / maxMinutes;
    console.log(bookingDuration);

    let styles = {
      'left.%': leftMargin,
      'width.%': bookingDuration,
    };
    return styles;
    
  }

  getPlanning() {
    if (this.itsMorning) {
      this.setBtnAfternoon();
    }
    else {
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
    console.log("C'est le Matin !");
  }
  setBtnAfternoon() {
    this.itsMorning = false;
    console.log("C'est l'après-midi !")
  }


}