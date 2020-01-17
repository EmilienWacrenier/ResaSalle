import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import * as moment from 'moment'

import {
  RECURRENCE,
  NUMERO_SEMAINE,
  JOUR_SEMAINE,
  CAPACITE,
  BOOKING_HOURS,
  BOOKING_MINUTES
} from "../../constantes/constantes";
import { RoomService } from 'src/app/services/room.service';
import { MatDialog, MatDialogConfig, MatTableDataSource } from '@angular/material';
import { BookingsearchComponent } from 'src/app/modals/bookingsearch/bookingsearch.component';
import { Booking } from 'src/app/classes/booking';
import { Room } from 'src/app/classes/room';
import { ReservationService } from 'src/app/services/reservation.service';


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

  selectedObjet: string;
  selectedStartDate: Date;
  selectedHourStart: number;
  selectedMinuteStart: number;
  selectedHourEnd: number;
  selectedMinuteEnd: number;
  selectedRoom: Room;
  startDate: string;
  endDate: string;
  capacity: number;
  roomRequiredCapacity: number = 6;
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
  errorObjet: string;
  datasAreGood = false;
  datasRecurrenceAreGood = false

  //variable pour le slide toggle pour activer la récurrence ou non
  recurrenceIsChecked = false;

  //liste des salles (reponse)
  roomList = []

  bookingBuilt: Booking[];

  dsBooking: MatTableDataSource<Booking>;
  displayedColumns: string[] = ['date', 'startDate', 'endDate', 'room'];

  constructor(
    private roomService: RoomService,
    private reservationService: ReservationService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.onSelect(new Date());
    this.selectedHourStart = moment().hour() + 1;
    this.selectedObjet = "Réunion";
    this.selectedMinuteStart = 0;
    this.selectedHourEnd = this.selectedHourStart + 1;
    this.selectedMinuteEnd = 0;
    this.selectedRoom = null;
    this.checkInput();
    console.log(this.capacites);
    this.capacites = CAPACITE;
    this.setRoomlist();
  }

  /*STEP1*/

  onSelect(event) {
    this.selectedStartDate = event;
    this.selectedDateDisplay = moment(this.selectedStartDate).locale("fr").format("DD MMMM YYYY");
  }

  checkInput() {
    this.errorHourStart = null;
    this.errorHourEnd = null;
    this.errorDate = null;
    this.errorObjet = null;

    // .replace(/\s/g, "") supprime tous les espaces d'une string
    if (!this.selectedStartDate
      || this.selectedObjet == null
      || this.selectedObjet.replace(/\s/g, "") == ""
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
    //check si un objet est renseigné
    if (!this.selectedObjet || this.selectedObjet.replace(/\s/g, "") == "" || this.selectedObjet == null) { this.errorObjet = "Veuillez renseigner un objet" };

    //check si la date est selectionnée
    if (!this.selectedStartDate) { this.errorDate = "Veuillez renseigner une date" };

    //check si la date selectionnée n'est pas passée
    if (this.dateIsWrong(this.selectedStartDate)) {
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

  isReccurent() {
    if (this.recurrenceIsChecked) { return true; }
    else return false;
  }

  /* STEP RECURRENCE */
  checkInputRecurrence() {
    this.errorEndDate = null;
    this.errorMensualite = null;

    if (!this.selectedEndDate
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

  errorCheckRecurrence() {
    //check si la date est selectionnée
    if (!this.selectedEndDate) { this.errorEndDate = "Veuillez renseigner une date" };

    //check si la date selectionnée n'est pas passée
    if (this.endDateIsWrong(this.selectedStartDate, this.selectedEndDate)) {
      this.errorEndDate = "Selectionner une date de fin de récurrence qui soit après la date de début"
    }

    if (!this.selectedRecurrence) { this.errorMensualite = "Veuillez selectionner une mensualité" };
  }

  endDateIsWrong(startDate, endDate) {
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

  setParameters() {
    this.startDate = "";
    this.endDate = "";
    this.capacity = null;

    this.startDate = moment(this.selectedStartDate)
      .set({ hour: this.selectedHourStart, minute: this.selectedMinuteStart, second: 0, millisecond: 0 })
      .format();

    this.endDate = moment(this.selectedEndDate)
      .set({ hour: this.selectedHourEnd, minute: this.selectedMinuteEnd, second: 0, millisecond: 0 })
      .format();

    if (this.choix.length != 0) {
      console.log(this.capacity);
      this.capacity = this.capacites[this.capacites.length - 1];
      console.log(this.capacity);

      for (const element of this.choix) {
        if (element < this.capacity) {
          this.capacity = element;
        }
      }
    }

    if (this.choix.length == 0) {
      this.capacity = this.capacites[0];
    }

    if (this.recurrenceIsChecked) {
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

  loadAvailablesIfNoRecurrence(){
    if(this.recurrenceIsChecked){
      this.roomList = null;
      this.roomService
        .getAvailableRooms(this.roomRequiredCapacity,this.startDate, this.endDate)
        .subscribe(
          data => 
          {this.roomList = data['result']}
        );
    }
  }
  setRoomlist() {
    this.roomService.getRooms().subscribe(data => {
      this.roomList = data['result'];
    })

  }
  getRoomsAvailable() {
    this.setParameters();

    this.roomService
      .getAvailableRooms(this.capacity, this.startDate, this.endDate)
      .subscribe(data => {
        this.roomList = data['result'];
        console.log(this.roomList)
      })
  }



  // Sélectionne une salle pour l'étape suivante, modifie les styles css sur la bonne card
  onSelectRoom(room) {
    if (room !== this.selectedRoom) {
      this.selectedRoom = room;
    }
  }

  onChangeCapacity() {
    this.selectedRoom = null;
    this.loadAvailablesIfNoRecurrence();
    console.log("No more selected room")
  }

  //fermeture de la modale avec DialogRef
  openDialog(room) {
    //config et ouverture de la 2eme test_modaleconst bookingCalendarDialogConfig = new MatDialogConfig();
    const bookingsearchDialogConfig = new MatDialogConfig();
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

  //STEP FINAL
  deleteBooking(booking) {
    console.log(booking);

  }

  sendToVerification() {
    console.log('Réservation : ');
    console.log(this.selectedRoom);
    console.log(this.selectedObjet);
    console.log(this.selectedStartDate);
    console.log(this.selectedHourStart + ':' + this.selectedMinuteStart);
    if (this.selectedEndDate) console.log(this.selectedEndDate);
    console.log(this.selectedHourEnd + ':' + this.selectedMinuteEnd);
    this.dsBooking = new MatTableDataSource<Booking>();
    let bookingBuilt = new Booking();
    /*bookingBuilt = {
      startDate: moment().hours(this.selectedHourStart).minutes(this.selectedMinuteStart).toString(),
      endDate: moment().hours(this.selectedHourEnd).minutes(this.selectedMinuteEnd).toString(),
      object: this.selectedObjet,
      roomId: this.selectedRoom.roomId,
      userId: 
    }*/
  }

  updateBookingsVerification() {
    this.dsBooking.data = null;
    /*this.reservationService.getCheckReservation().subscribe(
      (response) => {
        this.dsBooking.data = (response['result']);
      })*/
  }

}