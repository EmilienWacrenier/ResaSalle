import { Component, OnInit, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';

import {
  NUMERO_SEMAINE,
  JOUR_SEMAINE,
  BOOKING_HOURS,
  BOOKING_MINUTES
} from "../../../constantes/constantes";

import { WEEK_DAYS_FILTER } from '../../../constantes/weekDaysFilter';
import { EventEmitter } from '@angular/core';
import { SearchDataServiceService } from 'src/app/services/search-data-service.service';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { timestamp } from 'rxjs/operators';

@Component({
  selector: 'app-criteres',
  templateUrl: './criteres.component.html',
  styleUrls: ['./criteres.component.scss']
})
export class CriteresComponent implements OnInit {

  // Date du jour, utilisée pour limiter la période réservable
  today: Date;

  // Définition du nombre h/min incrémenté sur le timepicker
  hourStep: number = 1;
  minuteStep: number = 30;

  //
  timeStart = { hour: new Date().getHours() + 1, minute: 0 };
  timeEnd = { hour: new Date().getHours() + 2, minute: 0 };

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

  weekDaysFilter = WEEK_DAYS_FILTER;



  @Input() desktop: boolean;
  @Output() recurrenceChangeEvent = new EventEmitter<boolean>();
  @Output() loadAvailablesRoomsEvent = new EventEmitter();



  constructor(
    private searchDataService: SearchDataServiceService
  ) { }

  ngOnInit() {
    this.today = new Date();
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
    console.log(this.selectedDate);
    
    this.errorHourStart = null;
    this.errorHourEnd = null;
    this.errorDate = null;
    this.errorObjet = null;
    // .replace(/\s/g, "") supprime tous les espaces d'une string
    /*if (!this.selectedDate
      || this.selectedObjet == null
      || this.selectedObjet.replace(/\s/g, "") == ""
      //|| this.selectedHourStart == null
      //|| this.selectedMinuteStart == null
      //|| this.selectedHourEnd == null
      //|| this.selectedMinuteEnd == null
      || this.timeEnd
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
    }*/
    if(this.errorCheck()){
      this.datasAreGood = false;
    }
    else{
      this.datasAreGood = true;
    }
  }

  //check quelle valeur n'est pas bonne et donne le feedback necessaire
  errorCheck() {
    console.log('On verif les dates');

    //check si un objet est renseigné
    if (!this.selectedObjet || this.selectedObjet.replace(/\s/g, "") == "" || this.selectedObjet == null) { this.errorObjet = "Veuillez renseigner un objet"; return true; };

    //check si la date est selectionnée
    if (!this.selectedDate) { this.errorDate = "Veuillez renseigner une date"; return true; };

    //check si la date selectionnée n'est pas passée
    if (this.dateIsWrong(this.selectedDate)) {
      this.errorDate = "Selectionner une date non passée" ; return true;
    }

    //check si l'heure de début est entrée
    if (this.selectedHourStart == null || this.selectedMinuteStart == null) { this.errorHourStart = "Veuillez entrer une heure"; return true; };

    //check si l'heure de fin est entrée
    if (this.selectedHourEnd == null || this.selectedMinuteEnd == null) { this.errorHourEnd = "Veuillez entrer une heure"; return true; };

    //check si une des heures ne dépasse pas 18h
    if (this.selectedHourStart == 18 && this.selectedMinuteStart == 30) { this.errorHourStart = "L'heure est incorrecte"; return true; }
    if (this.selectedHourEnd == 18 && this.selectedMinuteEnd == 30) { this.errorHourEnd = "L'heure est incorrecte"; return true; }

    if (this.timeStart.hour >= 18) { this.errorHourStart = "Les salles ferment à 18h00"; return true; };
    if ((this.timeEnd.hour >= 18 && this.timeEnd.minute == 30) ||this.timeEnd.hour > 18) { this.errorHourEnd = "Les salles ferment à 18h00"; return true; };
    if (this.timeStart.hour <= 7) { this.errorHourStart = "Les salles ouvrent à 8h00"; return true; };
    if (this.timeEnd.hour <= 7) { this.errorHourEnd = "Les salles ouvrent à 8h00"; return true; };
    //check si l'heure de fin n'est pas avant l'heure de début
    if (this.hoursAreWrong()) {
      this.errorHourEnd = "L'heure de fin doit être après l'heure de début"; return true;
    }
    console.log('Verif terminee');

  }

  //fonction qui check si la date sélectionnée est hier ou avant
  dateIsWrong(date) {
    let today = new Date().setHours(0, 0, 0, 0);
    if (date < today) { return true; }
    else return false;
  }

  //fonction qui check si l'heure de début est avant l'heure de fin
  hoursAreWrong() {

    let momentTimeStart = this.timeStart.hour * 60 + this.timeStart.minute;
    let momentTimeEnd = this.timeEnd.hour * 60 + this.timeEnd.minute;
    let startingHour = this.selectedHourStart * 60 + this.selectedMinuteStart;
    let endingHour = this.selectedHourEnd * 60 + this.selectedMinuteEnd;
    if (momentTimeStart >= momentTimeEnd) { return true; }
    //if (startingHour >= endingHour) { return true; }
    else return false;
  }

  //formate les dates pour le back
  formatDates() {
    this.startDateWithHours = moment(this.selectedDate)
      .set({ hour: this.selectedHourStart, minute: this.selectedMinuteStart, second: 0, millisecond: 0 })
      .format('YYYY-MM-DD HH:mm:ss');

    this.endDateWithHours = moment(this.selectedDate)
      .set({ hour: this.selectedHourEnd, minute: this.selectedMinuteEnd, second: 0, millisecond: 0 })
      .format('YYYY-MM-DD HH:mm:ss');

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
