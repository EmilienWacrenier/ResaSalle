import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment'

import { 
  RECURRENCE, 
  NUMERO_SEMAINE, 
  JOUR_SEMAINE, 
  CAPACITE, 
  BOOKING_HOURS, 
  BOOKING_MINUTES } from "../../constantes/constantes";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  //**********************DATE*************************

  //variable pour la date et les heures
  startDate = new Date();
  selectedDateDisplay: string;

  //heures et minutes dans le select
  bookingHours: number[] = BOOKING_HOURS;
  bookingMinutes: number[] = BOOKING_MINUTES;

  //variable des heures selectionnées
  selectedMinuteStart: number;
  selectedHourStart: number;
  selectedMinuteEnd: number;
  selectedHourEnd: number;

  //variable de controle
  dateIsWrongControl: any;
  hoursAreNotSetControl: any;
  hoursAreWrongControl: any;

  //today
  today = new Date().setHours(0,0,0,0);

  //variable pour le slide toggle pour activer la récurrence ou non
  checked = false;  


  //**********************RECURRENCE*************************
  endDate;
  selectedRecurrence: string;
  selectedMensualite: string;

  recurrences: string[] = RECURRENCE;
  numSemaines: string[] = NUMERO_SEMAINE;
  jourSemaines: string[] = JOUR_SEMAINE;
  capacites: number[] = CAPACITE;
  choix: number[] = [];

  constructor(private _formBuilder: FormBuilder) {
      this.onSelect(this.startDate);
  }

  ngOnInit() {
    this.onSelect(event);
    this.hoursAreNotSetControl = this.hoursAreNotSet();
    console.log(this.hoursAreNotSetControl);
    this.hoursAreWrongControl = this.hoursAreWrong();
    console.log(this.hoursAreWrongControl);
  }

  /*STEP1*/

  onSelect(event) {
    this.startDate = event;
    this.selectedDateDisplay = moment(this.startDate).format("DD MMMM YYYY");
    this.dateIsWrongControl = this.dateIsWrong(event);
  }

  dateIsWrong(date){
    if (date < this.today) { return true}
    else return false;
  }

  hoursAreNotSet(){
    if (this.selectedHourStart == null
      || this.selectedMinuteStart == null
      || this.selectedHourEnd == null
      || this.selectedMinuteEnd == null) { return this.hoursAreNotSetControl = true; }
    else return this.hoursAreNotSetControl = false;
  }

  hoursAreWrong(){
    let startingHour = this.selectedHourStart * 60 + this.selectedMinuteStart;
    let endingHour = this.selectedHourEnd * 60 + this.selectedMinuteEnd;
    if (startingHour >= endingHour) { return this.hoursAreWrongControl = true;}
    else return this.hoursAreWrongControl = false;
  }
  isReccurent(){
    if (this.checked) { return true;}
    else return false;
  }

  /* Reccurence */

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}