import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Inject } from '@angular/core';

import * as moment from 'moment';

import { BOOKING_HOURS, BOOKING_MINUTES, ApiConstants } from '../../constantes/constantes'
import { ReservationService } from '../../services/reservation.service'
import { ToastrService } from 'ngx-toastr';
import { Room } from 'src/app/classes/room';
import { User } from 'src/app/classes/user';


@Component({
  selector: 'app-bookingdetails',
  templateUrl: './bookingdetails.component.html',
  styleUrls: ['./bookingdetails.component.scss']
})

export class BookingdetailsComponent implements OnInit {

  room: Room;

  currentUser : User;

  selectedMiniatures: string[] = []; //affichage des miniatures cf méthode onSelect()

  bookingHours: number[] = BOOKING_HOURS;
  bookingMinutes: number[] = BOOKING_MINUTES;

  selectedDate: Date;
  selectedHourStart: number;
  selectedMinuteStart: number;
  selectedHourEnd: number;
  selectedMinuteEnd: number;
  objet: string = "Réunion";


  errorObjet: string;
  errorHourStart: string;
  errorHourEnd: string;
  errorDate: string;
  baseMessage: string;


  constructor(
    private toastr: ToastrService,
    private cst: ApiConstants,
    private reservationService: ReservationService,
    public bookingDetailsDialogRef: MatDialogRef<BookingdetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    //récupération des infos de la salle selectionnée par rapport au component parent
    this.room = this.data.room;

    //set les paramètres en fonction de la case cliquée sur le planning
    this.setParamsOnInit(this.data.day, this.data.hour);
  }

  closeModal(): void {
    this.bookingDetailsDialogRef.close();
  }

  //set les paramètres en fonction de la case cliquée sur le planning
  setParamsOnInit(day, hour) {
    this.selectedDate = new Date(moment(this.data.selectedDate).isoWeekday(day + 1).format());

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
    }
    else {

      let startDate = moment(this.selectedDate).hour(this.selectedHourStart).minute(this.selectedMinuteStart).second(0).format("YYYY-MM-DD HH:mm:ss");
      let endDate = moment(this.selectedDate).hour(this.selectedHourEnd).minute(this.selectedMinuteEnd).second(0).format("YYYY-MM-DD HH:mm:ss");

      let reservation = {
        startDate: startDate,
        endDate: endDate,
        object: this.objet,
        userId: this.currentUser.userId,
        roomId: this.room.roomId
      };

      this.createReservation(reservation);
    }
  }

  createReservation(reservation) {
    this.baseMessage = '';
    this.reservationService.createReservation(reservation)
      .subscribe(
        (res) => {
          this.baseMessage = "Réservation créée";
          this.toastr.success('Réservation créée', this.cst.toastrTitle, this.cst.toastrOptions);
          //data à renvoyer dans le component parent (planning)
          let data = {
            roomId: this.data.room.roomId,
            selectedDate: this.selectedDate
          }

          setTimeout(() => this.bookingDetailsDialogRef.close(data), 500);
        }, (error) => {
          console.log(error);
          const message = "Créneau Indisponible"
          this.toastr.error(message, this.cst.toastrTitle, this.cst.toastrOptions);
          this.bookingDetailsDialogRef.close();
        }
      )
      
  }


  errorCheck() {
    //check si le champ objet est vide
    if (!this.objet) { this.errorObjet = "Veuillez renseigner un objet" };

    //check si la date est selectionnée
    if (!this.selectedDate) { this.errorDate = "Veuillez renseigner une date" };

    //check si la date selectionnée n'est pas passée
    if (this.dateIsWrong(this.selectedDate)) { this.errorDate = "Selectionner une date non passée" }

    //check si l'heure de début est entrée
    if (this.selectedHourStart == null || !this.selectedMinuteStart == null) { this.errorHourStart = "Veuillez entrer une heure" };

    //check si l'heure de fin est entrée
    if (!this.selectedHourEnd == null || !this.selectedMinuteEnd == null) { this.errorHourEnd = "Veuillez entrer une heure" };

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