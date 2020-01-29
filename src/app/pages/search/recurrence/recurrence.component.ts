import { Component, OnInit, Output } from '@angular/core';

import { RECURRENCE } from "../../../constantes/constantes";
import { SearchDataServiceService } from 'src/app/services/search-data-service.service';

import { EventEmitter } from '@angular/core';

import * as moment from 'moment'
@Component({
  selector: 'app-recurrence',
  templateUrl: './recurrence.component.html',
  styleUrls: ['./recurrence.component.scss']
})
export class RecurrenceComponent implements OnInit {

  recurrences: string[] = RECURRENCE;
  startDate: Date;
  //variables pour le slide toggle pour activer la récurrence ou non
  selectedEndDateRecurrence: Date;
  selectedRecurrenceName: string;

  errorLabelRecurrence: string;
  errorEndDateRecurrence: string;

  datasRecurrenceAreGood = false;

  @Output() loadRoomListEvent = new EventEmitter();

    constructor(
      private searchDataService: SearchDataServiceService
    ) { }

  ngOnInit() {
    this.searchDataService.startDate$.subscribe(res => this.startDate = res);
  }

  //A LA SELECTION DE LA DATE
  //Met la valeur dans la variable selectedStartDate
  //Affiche la valeur dans une autre variable (selectedDateDisplay)
  onSelectEndDateRecurrence(event) {
    this.selectedEndDateRecurrence = event.value;
  }

  /* STEP RECURRENCE */

  checkInputRecurrence() {
    this.errorEndDateRecurrence = null;
    this.errorLabelRecurrence = null;

    console.log(this.selectedRecurrenceName);

    if (!this.selectedEndDateRecurrence
      || !this.selectedRecurrenceName
      || this.endDateIsWrong(this.startDate, this.selectedEndDateRecurrence)) {
      this.errorCheckRecurrence();
      console.log(this.selectedEndDateRecurrence);
      console.log(this.selectedRecurrenceName);
      this.datasRecurrenceAreGood = false;
      console.log(this.datasRecurrenceAreGood);
    }
    else {
      this.datasRecurrenceAreGood = true;
      console.log(this.datasRecurrenceAreGood);
    }
  }

  errorCheckRecurrence() {
    //check si la date est selectionnée
    if (!this.selectedEndDateRecurrence || this.selectedEndDateRecurrence == null) {
      this.errorEndDateRecurrence = "Veuillez renseigner une date";
    }
    //check si la date selectionnée n'est pas passée
    else if (this.endDateIsWrong(this.startDate, this.selectedEndDateRecurrence)) {
      this.errorEndDateRecurrence = "Selectionner une date de fin de récurrence qui soit après la date de début"
    }

    if (!this.selectedRecurrenceName) {
      this.errorLabelRecurrence = "Veuillez selectionner une mensualité"
    };
  }

  endDateIsWrong(startDate, endDate) {
    console.log(startDate.getTime());
    console.log(endDate.getTime());

    if (endDate.getTime() < startDate.getTime()) { return true; }
    else return false;
  }

  setRecurrenceParams() {
    this.searchDataService.getEndDateRecurrence(moment(this.selectedEndDateRecurrence).format('YYYY-MM-DD HH:mm:ss'));
    this.searchDataService.getRecurrenceName(this.selectedRecurrenceName);
    this.loadRoomListEvent.emit();
  }


}