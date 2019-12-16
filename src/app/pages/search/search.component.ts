import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import * as moment from 'moment'

import { 
  RECURRENCE, 
  NUMERO_SEMAINE, 
  JOUR_SEMAINE, 
  CAPACITE, 
  BOOKING_HOURS, 
  BOOKING_MINUTES } from "../../constantes/constantes";
import { RoomService } from 'src/app/services/room.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { BookingsearchComponent } from 'src/app/modals/bookingsearch/bookingsearch.component';
import { Booking } from 'src/app/classes/booking';
import { Room } from 'src/app/classes/room';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  //**********************DATE*************************

  //variable pour afficher la date selectionnée
  selectedDateDisplay: string;

  //heures et minutes dans le select
  bookingHours: number[] = BOOKING_HOURS;
  bookingMinutes: number[] = BOOKING_MINUTES;
  recurrences: string[] = RECURRENCE;
  numSemaines: string[] = NUMERO_SEMAINE;
  jourSemaines: string[] = JOUR_SEMAINE;
  capacites: number[] = CAPACITE;
  choix: number[] = [];

  selectedStartDate: Date;
  selectedHourStart: number;
  selectedMinuteStart: number;
  selectedHourEnd: number;
  selectedMinuteEnd: number;
  startDate: string;
  endDate: string;
  capacity: number;
  //**********************RECURRENCE*************************
  selectedEndDate;
  selectedRecurrence: string;
  
  roomParameters: any;

  //controle
  errorHourStart: string;
  errorHourEnd: string;
  errorDate: string;
  errorEndDate: string;
  errorMensualite: string;
  datasAreGood = false;
  datasRecurrenceAreGood = false

  //variable pour le slide toggle pour activer la récurrence ou non
  recurrenceIsChecked = false;  

  //liste des salles (reponse)
  roomList = []

  constructor(
    private roomService: RoomService,
    public dialog: MatDialog){}

  ngOnInit() {
    this.onSelect(new Date());
    this.selectedHourStart = moment().hour()+1;
    this.selectedMinuteStart = 0;
    this.selectedHourEnd = this.selectedHourStart +1;
    this.selectedMinuteEnd = 0;
    this.checkInput();
    console.log(this.capacites);
    this.capacites = CAPACITE;
  }

  /*STEP1*/

  onSelect(event) {
    this.selectedStartDate = event;
    this.selectedDateDisplay = moment(this.selectedStartDate).format("DD MMMM YYYY");
  }

  checkInput() {
    this.errorHourStart = null;
    this.errorHourEnd = null;
    this.errorDate = null;

    if ( !this.selectedStartDate
      || this.selectedHourStart == null
      || this.selectedMinuteStart == null
      || this.selectedHourEnd == null
      || this.selectedMinuteEnd == null
      || this.dateIsWrong(this.selectedStartDate)
      || this.hoursAreWrong()) {
      this.errorCheck();
      console.log(this.selectedStartDate);
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
  
  errorCheck() {
    //check si la date est selectionnée
    if (!this.selectedStartDate) { this.errorDate = "Veuillez renseigner une date" };

    //check si la date selectionnée n'est pas passée
    if (this.dateIsWrong(this.selectedStartDate)) {
      this.errorDate = "Selectionner une date non passée"
    }

    //check si l'heure de début est entrée
    if (this.selectedHourStart==null || this.selectedMinuteStart==null) { this.errorHourStart = "Veuillez entrer une heure" };

    //check si l'heure de fin est entrée
    if (this.selectedHourEnd==null || this.selectedMinuteEnd==null) { this.errorHourEnd = "Veuillez entrer une heure" };

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
  
  isReccurent(){
    if (this.recurrenceIsChecked) { return true;}
    else return false;
  }
  
  /* STEP RECURRENCE */
  checkInputRecurrence() {
    this.errorEndDate = null;
    this.errorMensualite = null;

    if ( !this.selectedEndDate
      || !this.selectedRecurrence
      || this.endDateIsWrong(this.selectedStartDate, this.selectedEndDate)) {
      this.errorCheckRecurrence();
      console.log(this.selectedEndDate);
      console.log(this.selectedRecurrence);
      this.datasRecurrenceAreGood = false;
      console.log(this.datasRecurrenceAreGood);
    }
    else {
      this.datasRecurrenceAreGood = true;
      console.log(this.datasRecurrenceAreGood);
    }
  }

  errorCheckRecurrence(){
    //check si la date est selectionnée
    if (!this.selectedEndDate) { this.errorEndDate = "Veuillez renseigner une date" };

    //check si la date selectionnée n'est pas passée
    if (this.endDateIsWrong(this.selectedStartDate, this.selectedEndDate)) {
      this.errorEndDate = "Selectionner une date de fin de récurrence qui soit après la date de début"
    }

    if (!this.selectedRecurrence) { this.errorMensualite = "Veuillez selectionner une mensualité" };
  }

  endDateIsWrong(startDate, endDate){
    console.log(startDate.getTime());
    console.log(endDate.getTime());

    if (endDate.getTime() < startDate.getTime()) { return true; }
    else return false;
  }

  /* STEP CAPACITE */

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

  setParameters(){
    this.startDate = "";
    this.endDate = "";
    this.capacity = null;

    this.startDate = moment(this.selectedStartDate)
    .set({hour:this.selectedHourStart,minute:this.selectedMinuteStart,second:0,millisecond:0})
    .format();

    this.endDate = moment(this.selectedEndDate)
    .set({hour:this.selectedHourEnd,minute:this.selectedMinuteEnd,second:0,millisecond:0})
    .format();

    for(const element of this.choix){
      this.capacity = this.choix[0];
      if(element < this.capacity){
        this.capacity = element;
      }
    }

    if(this.choix.length == 0){
      this.capacity = this.capacites[0];
    }

    if(this.recurrenceIsChecked){
      console.log(this.selectedRecurrence);
      console.log(this.selectedEndDate);
    }

    this.roomParameters = {
      startDate: this.startDate,
      endDate: this.endDate,
      capacity: this.capacity
    }
    console.log(this.roomParameters);
  }

  getRoomsAvailable(){
    this.setParameters();
    console.log()

    this.roomService
    .getAvailableRooms(this.capacity, this.startDate, this.endDate)
    .subscribe(data => {
      this.roomList = data['result'];
      console.log(this.roomList)
    })
  }

  onSelectRoom(){

    /*if( resa true) { on va vers le componenent de reglage }
    if(pas resa) { ouvre modale de participant }*/
    
  }

  //fermeture de la modale avec DialogRef
  openDialog(room) {
    //config et ouverture de la 2eme test_modaleconst bookingCalendarDialogConfig = new MatDialogConfig();
    const bookingsearchDialogConfig = new MatDialogConfig();
    bookingsearchDialogConfig.width = "60vw";
    bookingsearchDialogConfig.height = "80vh";
    bookingsearchDialogConfig.data = { 
      room: room,
      startDate: this.startDate,
      endDate: this.endDate
    };

    this.dialog.open(BookingsearchComponent, bookingsearchDialogConfig)
      .afterClosed().subscribe((data) => {
        console.log(data);
      });
  }

}