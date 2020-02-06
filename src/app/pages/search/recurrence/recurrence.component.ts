import { Component, OnInit, Output } from '@angular/core';

import { RECURRENCE } from "../../../constantes/constantes";
import { SearchDataServiceService } from 'src/app/services/search-data-service.service';

import { EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-recurrence',
  templateUrl: './recurrence.component.html',
  styleUrls: ['./recurrence.component.scss']
})
export class RecurrenceComponent implements OnInit {

  recurrences: string[] = RECURRENCE;
  startDate: Date;
  //variables pour le slide toggle pour activer la récurrence ou non
  selectedEndDateRecurrence: string;
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

    if (!this.selectedEndDateRecurrence
      || !this.selectedRecurrenceName
      || this.endDateIsWrong(this.startDate, this.selectedEndDateRecurrence)) {
      this.errorCheckRecurrence();
      this.datasRecurrenceAreGood = false;
    }
    else {
      this.datasRecurrenceAreGood = true;
    }
  }

  errorCheckRecurrence() {
    //check si la date est selectionnée
    if (!this.selectedEndDateRecurrence || this.selectedEndDateRecurrence == null) {
      this.errorEndDateRecurrence = "Veuillez renseigner une date de fin de récurrence";
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
    if (endDate.getTime() < startDate.getTime()) { return true; }
    else return false;
  }

  setRecurrenceParams() {
    this.searchDataService.getEndDateRecurrence(
      moment(this.selectedEndDateRecurrence)
       .set({ hour: 23, minute: 59, second: 59})
       .format('YYYY-MM-DD HH:mm:ss')
    );
    this.searchDataService.getRecurrenceName(this.selectedRecurrenceName);
    this.loadRoomListEvent.emit();
  }


}