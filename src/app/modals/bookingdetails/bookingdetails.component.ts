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

  selectedMiniatures: string[] = []; //affichage des miniatures cf méthode onSelect()

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
  emailList = [];

  selectedDateFromPlanning;


  constructor(
    private userService: UserService,
    private reservationService: ReservationService,
    public bookingDetailsDialogRef: MatDialogRef<BookingdetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.room = this.data.room;
    this.selectedDateFromPlanning = this.data.selectedDate;
    this.getUsers();
    this.setParamsOnInit(this.data.day, this.data.hour);
  }

  setParamsOnInit(day, hour) {
    this.selectedDate = new Date(moment().isoWeekday(day+1).format());
    console.log(this.selectedDate);

    if (hour % 2 == 0) {
      this.selectedHourStart = this.bookingHours[hour / 2];
      this.selectedMinuteStart = this.bookingMinutes[0];
    }
    else if (hour % 2 == 1) {
      this.selectedHourStart = this.bookingHours[(hour - 1) / 2];
      this.selectedMinuteStart = this.bookingMinutes[1];
    }
    else console.log("erreur au parametrage");

    this.selectedHourEnd = this.selectedHourStart+1;
    this.selectedMinuteEnd = this.selectedMinuteStart;
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

  onKey(event) {
    let valueSearch = event.target.value.toLowerCase();
    console.log(valueSearch);
    this.usersList = this.users.filter(user =>
      user.firstName.toLowerCase().includes(valueSearch)
      || user.lastName.toLowerCase().includes(valueSearch)
    );
  }

  onKeyEnter(event) {
    let valueEmail = event.target.value;
    this.emailList.push(valueEmail);
  }

  removeEmail(email) {
    this.emailList.splice(this.selectedParticipants.indexOf(email), 1);
  }

  //Affichage des vignettes
  //parcours d'une collection de users selectionnés et insertion de value cf hmtl l.23 [value]="user.miniature"
  onSelectParticipant(user) {
    console.log(user);
    if (this.selectedParticipants.includes(user)) {
      //supprime le participant
      this.selectedParticipants.splice(this.selectedParticipants.indexOf(user), 1);
    }
    else {
      //ajoute le participant
      this.selectedParticipants.push(user);
      console.log(this.selectedParticipants);
    }
  }

  removeParticipant(user) {
    this.selectedParticipants.splice(this.selectedParticipants.indexOf(user), 1);
  }

  resetParticipants() {
    this.selectedParticipants = [];
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

      let participantIdList = [];
      for (const participant of this.selectedParticipants) {
        participantIdList.push(participant.userId);
      }

      console.log(participantIdList);

      const reservation = {
        startDate: startDate,
        endDate: endDate,
        object: this.objet,
        userId: this.currentUser.userId,
        roomId: this.room.roomId,
        users: participantIdList
      };

      console.log('La réservation : ' + reservation.startDate);
      console.log('La réservation : ' + reservation.endDate);
      console.log('La réservation : ' + reservation.object);
      console.log('La réservation : ' + reservation.userId);
      console.log('La réservation : ' + reservation.roomId);
      console.log('La réservation : ' + reservation.users);
      this.reservationService.createReservation(reservation);
      this.bookingDetailsDialogRef.close(this.selectedDate);
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
}