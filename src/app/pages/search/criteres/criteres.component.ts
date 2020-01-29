import { Component, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

import {
  NUMERO_SEMAINE,
  JOUR_SEMAINE,
  BOOKING_HOURS,
  BOOKING_MINUTES
} from "../../../constantes/constantes";

import { EventEmitter } from '@angular/core';
import { SearchDataServiceService } from 'src/app/services/search-data-service.service';

@Component({
  selector: 'app-criteres',
  templateUrl: './criteres.component.html',
  styleUrls: ['./criteres.component.scss']
})
export class CriteresComponent implements OnInit {

  //heures et minutes dans le select
  bookingHours: number[] = BOOKING_HOURS;
  bookingMinutes: number[] = BOOKING_MINUTES;

  numSemaines: string[] = NUMERO_SEMAINE;
  jourSemaines: string[] = JOUR_SEMAINE;

  //variable objet
  selectedObjet: string = "Réunion";

  //variable pour afficher la date selectionnée
  selectedDateDisplay: string;

  //variable date de la resa
  selectedDate: Date;

  //variables heures date de début
  selectedHourStart: number = moment().hour() + 1;
  selectedMinuteStart: number = 0;

  //variables heures date de fin
  selectedHourEnd: number = this.selectedHourStart + 1;
  selectedMinuteEnd: number = 0;

  //variables des dates avec les heures de debut et de fin de la resa
  startDateWithHours: string;
  endDateWithHours: string;

  //variables de controle
  errorObjet: string;

  errorDate: string;
  errorHourStart: string;
  errorHourEnd: string;

  datasAreGood: boolean = false;

  //variables pour le slide toggle pour activer la récurrence ou non
  recurrenceIsChecked: boolean = false;

  @Output() recurrenceChangeEvent = new EventEmitter<boolean>();
  @Output() loadAvailablesRoomsEvent = new EventEmitter();

  constructor(
    private searchDataService: SearchDataServiceService
  ) { }

  ngOnInit() {
    this.onSelectDate(new Date());
    this.checkInput();
  }


  //A LA SELECTION DE LA DATE
  //Met la valeur dans la variable selectedStartDate
  //Affiche la valeur dans une autre variable (selectedDateDisplay)
  onSelectDate(event) {
    this.selectedDate = event;
    this.selectedDateDisplay = moment(this.selectedDate).locale("fr").format("DD MMMM YYYY");
  }

  //FONCTION QUI CHECK SI UNE INFO EST NULLE,
  //SI OUI : on ne peut pas passer à la fonction suivante
  // + passe dans errorCheck() pour avoir un feedback
  //SI NON => on peut passer à la fonction suivante
  checkInput() {
    this.errorHourStart = null;
    this.errorHourEnd = null;
    this.errorDate = null;
    this.errorObjet = null;

    // .replace(/\s/g, "") supprime tous les espaces d'une string
    if (!this.selectedDate
      || this.selectedObjet == null
      || this.selectedObjet.replace(/\s/g, "") == ""
      || this.selectedHourStart == null
      || this.selectedMinuteStart == null
      || this.selectedHourEnd == null
      || this.selectedMinuteEnd == null
      || this.dateIsWrong(this.selectedDate)
      || this.hoursAreWrong()) {
      this.errorCheck();
      console.log(this.selectedDate);
      console.log(this.selectedHourStart);
      console.log(this.selectedMinuteStart);
      console.log(this.selectedHourEnd);
      console.log(this.selectedMinuteEnd);
      this.datasAreGood = false;
      console.log(this.datasAreGood);
    }
    else {
      this.datasAreGood = true;
      console.log(this.datasAreGood);
    }
  }

  //check quelle valeur n'est pas bonne et donne le feedback necessaire
  errorCheck() {
    //check si un objet est renseigné
    if (!this.selectedObjet || this.selectedObjet.replace(/\s/g, "") == "" || this.selectedObjet == null) { this.errorObjet = "Veuillez renseigner un objet" };

    //check si la date est selectionnée
    if (!this.selectedDate) { this.errorDate = "Veuillez renseigner une date" };

    //check si la date selectionnée n'est pas passée
    if (this.dateIsWrong(this.selectedDate)) {
      this.errorDate = "Selectionner une date non passée"
    }

    //check si l'heure de début est entrée
    if (this.selectedHourStart == null || this.selectedMinuteStart == null) { this.errorHourStart = "Veuillez entrer une heure" };

    //check si l'heure de fin est entrée
    if (this.selectedHourEnd == null || this.selectedMinuteEnd == null) { this.errorHourEnd = "Veuillez entrer une heure" };

    //check si une des heures ne dépasse pas 18h
    if (this.selectedHourStart == 18 && this.selectedMinuteStart == 30) { this.errorHourStart = "L'heure est incorrecte" }
    if (this.selectedHourEnd == 18 && this.selectedMinuteEnd == 30) { this.errorHourEnd = "L'heure est incorrecte" }

    //check si l'heure de fin n'est pas avant l'heure de début
    if (this.hoursAreWrong()) {
      this.errorHourEnd = "L'heure de fin doit être après l'heure de début"
    }
  }

  //fonction qui check si la date sélectionnée est hier ou avant
  dateIsWrong(date) {
    let today = new Date().setHours(0, 0, 0, 0);
    if (date < today) { return true; }
    else return false;
  }

  //fonction qui check si l'heure de début est avant l'heure de fin
  hoursAreWrong() {
    let startingHour = this.selectedHourStart * 60 + this.selectedMinuteStart;
    let endingHour = this.selectedHourEnd * 60 + this.selectedMinuteEnd;
    if (startingHour >= endingHour) { return true; }
    else return false;
  }

  //formate les dates pour le back
  formatDates() {
    this.startDateWithHours = moment(this.selectedDate)
      .set({ hour: this.selectedHourStart, minute: this.selectedMinuteStart, second: 0, millisecond: 0 })
      .format("YYYY-MM-DD HH:mm:ss");

    this.endDateWithHours = moment(this.selectedDate)
      .set({ hour: this.selectedHourEnd, minute: this.selectedMinuteEnd, second: 0, millisecond: 0 })
      .format("YYYY-MM-DD HH:mm:ss");

    this.searchDataService.getfullStartDate(this.startDateWithHours);
    this.searchDataService.getfullEndDate(this.endDateWithHours);
    this.searchDataService.getObject(this.selectedObjet);

  }

  changeRecurrence() {
    this.recurrenceIsChecked = !this.recurrenceIsChecked;
    console.log(this.recurrenceIsChecked);
    this.recurrenceChangeEvent.emit(this.recurrenceIsChecked);
  }

  clickWithoutRecurrence() {
    console.log("Should load available rooms");
    this.loadAvailablesRoomsEvent.emit();


  }



}
