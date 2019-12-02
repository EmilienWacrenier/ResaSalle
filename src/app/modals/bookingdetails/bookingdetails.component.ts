import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Inject } from '@angular/core';

import { BOOKING_HOURS, BOOKING_MINUTES } from '../../constantes/constantes'
import { Room } from 'src/app/classes/room';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ReservationService } from '../../services/reservation.service'
import { Booking } from '../../classes/booking';
import * as moment from 'moment';

@Component({
  selector: 'app-bookingdetails',
  templateUrl: './bookingdetails.component.html',
  styleUrls: ['./bookingdetails.component.scss']
})

export class BookingdetailsComponent implements OnInit {

  room;

  currentUser;

  selectedMiniatures: string[]; //affichage des miniatures cf méthode onSelect()
  users: User[] = [ //liste d'utilisateurs pour test
    {
      lastName: 'amri',
      firstName: 'virginie',
      miniature: 'AV'
    },
    {
      lastName: 'pascal',
      firstName: 'marie flore',
      miniature: 'PMF'
    },
    {
      lastName: 'henry',
      firstName: 'stephanie',
      miniature: 'HS'
    },
    {
      lastName: 'villeminot',
      firstName: 'fabien',
      miniature: 'VF'
    },
    {
      lastName: 'boulo',
      firstName: 'lionel',
      miniature: 'BL'
    }
  ];

  bookingHours: number[] = BOOKING_HOURS;
  bookingMinutes: number[] = BOOKING_MINUTES;

  selectedDate: Date;
  selectedHourStart: number;
  selectedMinuteStart: number;
  selectedHourEnd: number;
  selectedMinuteEnd: number;
  objet: string;
  errorObjet: string;
  errorHourStart: string;
  errorHourEnd: string;
  errorDate: string;
  errorBase: string;


  constructor(
    private reservationService: ReservationService,
    public bookingDetailsDialogRef: MatDialogRef<BookingdetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.room = this.data.room;
  }

  close() {
    this.bookingDetailsDialogRef.close();
  }
  //Affichage des vignettes
  //parcours d'une collection de users selectionnés et insertion de value cf hmtl l.23 [value]="user.miniature"
  onSelectParticipant(v) {
    this.selectedMiniatures = [];
    for (let a of v) {
      this.selectedMiniatures.push(a.value);
    }
  }

<<<<<<< HEAD
  onSubmit(){

    let startDate = moment(this.selectedDate).hour(this.selectedHourStart).minute(this.selectedMinuteStart).second(0).format("YYYY-MM-DD hh:mm:ss");
    let endDate = moment(this.selectedDate).hour(this.selectedHourEnd).minute(this.selectedMinuteEnd).second(0).format("YYYY-MM-DD hh:mm:ss");
    console.log(
      "startDate : " + startDate + " . endDate : " + endDate
    )

    const reservation = {
      startDate: startDate,
      endDate: endDate,
      objet: this.objet,
      user_id: this.currentUser.idUser,
      salle_id: 1
    };
    console.log('La réservation : ' + reservation.startDate);
    console.log('La réservation : ' + reservation.endDate);
    console.log('La réservation : ' + reservation.objet);
    console.log('La réservation : ' + reservation.user_id);
    console.log('La réservation : ' + reservation.salle_id);
    this.reservationService.createReservation(reservation);
  }

=======
  onSelectDate(event) {
    this.selectedDate = event;
  }

  onSubmit() {

    this.errorObjet = null;
    this.errorHourStart = null;
    this.errorHourEnd = null;
    this.errorDate = null;
    this.errorBase = null;

    if (!this.objet
      || !this.selectedDate
      || this.selectedHourStart == null
      || !this.selectedMinuteStart == null
      || !this.selectedHourEnd == null
      || !this.selectedMinuteEnd == null
      || this.dateIsWrong(this.selectedDate)
      || this.hoursAreWrong()) {
      this.errorCheck();
      console.log(this.objet)
      console.log(this.selectedDate);
      console.log(this.selectedHourStart);
      console.log(this.selectedMinuteStart);
      console.log(this.selectedHourEnd);
      console.log(this.selectedMinuteEnd);
    }
    else {

      let startDate = moment(this.selectedDate).hour(this.selectedHourStart).minute(this.selectedMinuteStart).second(0).format("YYYY-MM-DD HH:mm:ss");
      let endDate = moment(this.selectedDate).hour(this.selectedHourEnd).minute(this.selectedMinuteEnd).second(0).format("YYYY-MM-DD HH:mm:ss");
      console.log(
        "startDate : " + startDate + " . endDate : " + endDate
      )

      const reservation = {
        startDate: startDate,
        endDate: endDate,
        object: this.objet,
        userId: this.currentUser.userId,
        roomId: 1
      };

      console.log('La réservation : ' + reservation.startDate);
      console.log('La réservation : ' + reservation.endDate);
      console.log('La réservation : ' + reservation.object);
      console.log('La réservation : ' + reservation.userId);
      console.log('La réservation : ' + reservation.roomId);
      this.reservationService.createReservation(reservation);

    }
  }

  errorCheck() {
    //check si le champ objet est vide
    if (!this.objet) { this.errorObjet = "Veuillez renseigner un objet" };

    //check si la date est selectionnée
    if (!this.selectedDate) { this.errorDate = "Veuillez renseigner une date" };

    //check si la date selectionnée n'est pas passée
    if (this.dateIsWrong(this.selectedDate)) {
      this.errorDate = "Selectionner une date non passée"
    }

    //check si l'heure de début est entrée
    if (!this.selectedHourStart || !this.selectedMinuteStart) { this.errorHourStart = "Veuillez entrer une heure" };

    //check si l'heure de fin est entrée
    if (!this.selectedHourEnd || !this.selectedMinuteEnd) { this.errorHourEnd = "Veuillez entrer une heure" };

    //check si une des heures ne dépasse pas 18h
    if (this.selectedHourStart == 18 && this.selectedMinuteStart == 30) { this.errorHourStart = "L'heure est incorrecte" }
    if (this.selectedHourEnd == 18 && this.selectedMinuteEnd == 30) { this.errorHourEnd = "L'heure est incorrecte" }

    //check si l'heure de fin n'est pas avant l'heure de début
    if (this.hoursAreWrong()) {
      this.errorHourEnd = "L'heure de fin doit être après l'heure de début"
    }
  }

  dateIsWrong(date) {
    let today = new Date().setHours(0, 0, 0, 0);
    if (date < today) { return true; }
    else return false;
  }

  hoursAreWrong() {
    let startingHour = this.selectedHourStart * 60 + this.selectedMinuteStart;
    let endingHour = this.selectedHourEnd * 60 + this.selectedMinuteEnd;
    if (startingHour >= endingHour) { return true; }
    else return false;
  }

  getReservationsOfThisWeek(salleId, startDate, endDate) {
    this.reservationService
      .getReservationsOfThisWeek(salleId, startDate, endDate)
      .subscribe(data => {
        this.errorBase = data['result'];
        console.log(this.errorBase);
      })
  }

>>>>>>> a97e112386501f0cea38997aefc4ad7ba5bb20c4


}
//Interface User pour test (liste d'utilisateurs factice)
export interface User {
  lastName: string;
  firstName: string;
  miniature: string;
}
