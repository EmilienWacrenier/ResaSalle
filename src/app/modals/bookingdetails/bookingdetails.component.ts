import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Inject } from '@angular/core';

import * as moment from 'moment';

import { BOOKING_HOURS, BOOKING_MINUTES } from '../../constantes/constantes'
import { User } from '../../classes/user';

import { UserService } from 'src/app/services/user.service';
import { ReservationService } from '../../services/reservation.service'


@Component({
  selector: 'app-bookingdetails',
  templateUrl: './bookingdetails.component.html',
  styleUrls: ['./bookingdetails.component.scss']
})

export class BookingdetailsComponent implements OnInit {

  room;

  currentUser;

  selectedMiniatures: string[]; //affichage des miniatures cf méthode onSelect()

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

  users: User[]
  usersList;
  selectedParticipants = [];


  constructor(
    private userService: UserService,
    private reservationService: ReservationService,
    public bookingDetailsDialogRef: MatDialogRef<BookingdetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.room = this.data.room;
    this.getUsers();
  }

  close() {
    this.bookingDetailsDialogRef.close();
  }

  //Appel à l'api
  getUsers() {
    this.userService
      .getUsers()
      .subscribe(data => {
        this.users = data['result'];
        this.users.sort(
          (a, b) => a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase())
        );
        console.log(this.users);
        this.usersList = this.users;
      })
  }

  onKey(event){
    let valueSearch = event.target.value.toLowerCase();
    console.log(valueSearch);
    this.usersList = this.users.filter(user => 
      user.firstName.toLowerCase().includes(valueSearch)
      || user.lastName.toLowerCase().includes(valueSearch)
      );
  }

  //Affichage des vignettes
  //parcours d'une collection de users selectionnés et insertion de value cf hmtl l.23 [value]="user.miniature"
  onSelectParticipant(users) {
    this.selectedParticipants = [];
    for (let user of users) {
      this.selectedParticipants.push(user.value.userId);
      console.log(this.selectedParticipants);
    }

    this.selectedMiniatures = [];
    for (let user of users) {
      this.selectedMiniatures.push(
        user.value.firstName.charAt(0) + 
        user.value.lastName.charAt(0)
      );
    }
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
      || this.selectedMinuteStart == null
      || this.selectedHourEnd == null
      || this.selectedMinuteEnd == null
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
        roomId: 1,
        users: this.selectedParticipants
      };

      console.log('La réservation : ' + reservation.startDate);
      console.log('La réservation : ' + reservation.endDate);
      console.log('La réservation : ' + reservation.object);
      console.log('La réservation : ' + reservation.userId);
      console.log('La réservation : ' + reservation.roomId);
      console.log('La réservation : ' + reservation.users);
      this.reservationService.createReservation(reservation);
      this.close();
    }
  }

  errorCheck() {
    //check si le champ objet est vide
    if (!this.objet) { this.errorObjet = "Veuillez renseigner un objet" };

    //check si la date est selectionnée
    if (!this.selectedDate) { this.errorDate = "Veuillez renseigner une date" };

    //check si la date selectionnée n'est pas passée
    if (this.dateIsWrong(this.selectedDate)) { this.errorDate = "Selectionner une date non passée" }

    //check si l'heure de début est entrée
    if (!this.selectedHourStart || !this.selectedMinuteStart) { this.errorHourStart = "Veuillez entrer une heure" };

    //check si l'heure de fin est entrée
    if (!this.selectedHourEnd || !this.selectedMinuteEnd) { this.errorHourEnd = "Veuillez entrer une heure" };

    //check si une des heures ne dépasse pas 18h
    if (this.selectedHourStart == 18 && this.selectedMinuteStart == 30) { this.errorHourStart = "L'heure est incorrecte" }
    if (this.selectedHourEnd == 18 && this.selectedMinuteEnd == 30) { this.errorHourEnd = "L'heure est incorrecte" }

    //check si l'heure de fin n'est pas avant l'heure de début
    if (this.hoursAreWrong()) { this.errorHourEnd = "L'heure de fin doit être après l'heure de début" }
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



}
//Interface User pour test (liste d'utilisateurs factice)
export interface User {
  lastName: string;
  firstName: string;
  miniature: string;
}
