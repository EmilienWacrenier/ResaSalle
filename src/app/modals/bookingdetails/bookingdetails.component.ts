import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Inject } from '@angular/core';

import * as moment from 'moment';

import { BOOKING_HOURS, BOOKING_MINUTES } from '../../constantes/constantes'
import { User } from '../../classes/user';
import { Booking } from '../../classes/booking';

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
  baseMessage: string;

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
    console.log(this.currentUser);
    //récupération des infos de la salle selectionnée par rapport au component parent
    this.room = this.data.room;
    //récupération des users en base
    this.getUsers();
    //set les paramètres en fonction de la case cliquée sur le planning
    this.setParamsOnInit(this.data.day, this.data.hour);
  }

  //set les paramètres en fonction de la case cliquée sur le planning
  setParamsOnInit(day, hour) {
    this.selectedDate = new Date(moment().isoWeekday(day + 1).format());
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

    this.selectedHourEnd = this.selectedHourStart + 1;
    this.selectedMinuteEnd = this.selectedMinuteStart;
  }

  //quand on change la date
  onSelectDate(event) {
    this.selectedDate = event.value;
    console.log(this.selectedDate);
  }

  //Appel à l'api pour avoir la liste des participants
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

  //recherche de participants
  onKey(event) {
    let valueSearch = event.target.value.toLowerCase();
    console.log(valueSearch);
    this.usersList = this.users.filter(user =>
      user.firstName.toLowerCase().includes(valueSearch)
      || user.lastName.toLowerCase().includes(valueSearch)
    );
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

  //ajout d'un email quand on presse entrée
  onKeyEnter(event) {
    let valueEmail = event.target.value;
    this.emailList.push(valueEmail);
  }

  //supprimer un participant selectionné au clic
  removeParticipant(user) {
    this.selectedParticipants.splice(this.selectedParticipants.indexOf(user), 1);
  }

  //supprime un email ajouté au clic
  removeEmail(email) {
    this.emailList.splice(this.selectedParticipants.indexOf(email), 1);
  }

  //reset la liste des participants quand on clique sur le bouton reset
  resetParticipants() {
    this.selectedParticipants = [];
    this.emailList = [];
  }

  //au clic de la création de la réservation
  onSubmit() {

    this.errorObjet = null;
    this.errorHourStart = null;
    this.errorHourEnd = null;
    this.errorDate = null;

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

      let reservation = {
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
      //this.createReservation(reservation);

      this.createReservation(reservation);
    }
  }

  createReservation(reservation) {
    this.reservationService.createReservation(reservation)
      .subscribe(
        () => {
          this.baseMessage = "Réservation créée";
          //data à renvoyer dans le component parent (planning)
          let data = { 
            roomId: this.data.room.roomId,
            selectedDate: this.selectedDate
          }
          
          setTimeout( () => this.bookingDetailsDialogRef.close(data), 2000 );
        }, (error) => {
          console.log(error);
          this.baseMessage = error;
          console.log(this.baseMessage);
        }
      );
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