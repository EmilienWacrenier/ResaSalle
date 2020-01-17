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

  //heures et minutes dans le select
  bookingHours: number[] = BOOKING_HOURS;
  bookingMinutes: number[] = BOOKING_MINUTES;
  recurrences: string[] = RECURRENCE;
  numSemaines: string[] = NUMERO_SEMAINE;
  jourSemaines: string[] = JOUR_SEMAINE;
  capacites: number[] = CAPACITE;
  choix: number[] = [];


  selectedObjet: string;

  //variable pour afficher la date selectionnée
  selectedDateDisplay: string;

  //variable date de la resa
  selectedDate: Date;

  //variables heures date de début
  selectedHourStart: number;
  selectedMinuteStart: number;

  //variables heures date de fin
  selectedHourEnd: number;
  selectedMinuteEnd: number;

  //variable salle
  selectedRoom: Room;

  //variables des dates avec les heures de debut et de fin de la resa
  startDateWithHours: string;
  endDateWithHours: string;

  //variables de capacité
  roomRequiredCapacity: number = 6;
  capacity: number;

  //variables pour le slide toggle pour activer la récurrence ou non
  recurrenceIsChecked = false;

  selectedEndDateRecurrence: Date;
  selectedRecurrence: string;

  //variables de controle
  errorObjet: string;

  errorDate: string;
  errorHourStart: string;
  errorHourEnd: string;

  errorLabelRecurrence: string;
  errorEndDateRecurrence: string;

  datasAreGood = false;
  datasRecurrenceAreGood = false

  //variable qui regroupe les infos pour la requete HTTP
  roomParameters: any;

  //liste des salles (reponse)
  roomList = []

  //variable pour le planning
  listeReservation: Booking[];
  weekDays: any[];
  bookingsOfTheWeek: any;

  dsBooking: MatTableDataSource<Booking>;
  displayedColumns: string[] = ['date', 'startDate', 'endDate', 'room'];

  constructor(
    private roomService: RoomService,
    private reservationService: ReservationService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.onSelectDate(new Date());
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

  //check si la récurrence est activée
  isReccurent() {
    if (this.recurrenceIsChecked) { return true; }
    else return false;
  }

  /* STEP RECURRENCE */
  checkInputRecurrence() {
    this.errorEndDateRecurrence = null;
    this.errorLabelRecurrence = null;

    if (!this.selectedEndDateRecurrence
      || !this.selectedRecurrence
      || this.endDateIsWrong(this.selectedDate, this.selectedEndDateRecurrence)) {
      this.errorCheckRecurrence();
      console.log(this.selectedEndDateRecurrence);
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
    if (!this.selectedEndDateRecurrence) { this.errorEndDateRecurrence = "Veuillez renseigner une date" };

    //check si la date selectionnée n'est pas passée
    if (this.endDateIsWrong(this.selectedDate, this.selectedEndDateRecurrence)) {
      this.errorEndDateRecurrence = "Selectionner une date de fin de récurrence qui soit après la date de début"
    }

    if (!this.selectedRecurrence) { this.errorLabelRecurrence = "Veuillez selectionner une mensualité" };
  }

  endDateIsWrong(startDate, endDate) {
    console.log(startDate.getTime());
    console.log(endDate.getTime());

    if (endDate.getTime() < startDate.getTime()) { return true; }
    else return false;
  }

  // Sélectionne une salle pour l'étape suivante, modifie les styles css sur la bonne card
  onSelectRoom(room) {
    if (room !== this.selectedRoom) {
      this.selectedRoom = room;
      this.capacity = this.roomRequiredCapacity;
    }
  }

  onChangeCapacity() {
    this.selectedRoom = null;
    console.log("No more selected room")
  }


  setParameters() {
    this.startDateWithHours = moment(this.selectedDate)
      .set({ hour: this.selectedHourStart, minute: this.selectedMinuteStart, second: 0, millisecond: 0 })
      .format();

    this.endDateWithHours = moment(this.selectedDate)
      .set({ hour: this.selectedHourEnd, minute: this.selectedMinuteEnd, second: 0, millisecond: 0 })
      .format();

    if (!this.recurrenceIsChecked) {
      this.roomParameters = {
        startDate: this.startDateWithHours,
        endDate: this.endDateWithHours,
        roomId: this.selectedRoom.roomId
      }
      console.log(this.roomParameters);
    }
    else {
      this.roomParameters = {
        startDate: this.startDateWithHours,
        endDate: this.endDateWithHours,
        roomId: this.selectedRoom.roomId,
        labelRecurrence: this.selectedRecurrence,
        endDateRecurrence: this.selectedEndDateRecurrence
      }
      console.log(this.roomParameters);
    }
  }

  setRoomlist() {
    this.roomService.getRooms().subscribe(data => {
      this.roomList = data['result'];
    })
  }

  /*
  getRoomsAvailable() {
    this.setParameters();

    this.roomService
      .getAvailableRooms(this.capacity, this.startDate, this.endDate)
      .subscribe(data => {
        this.roomList = data['result'];
        console.log(this.roomList)
      })
  }
*/

  /* PLANNING 

  //au changement de salle, on change le planning en fonction de la salle selectionnée en appelant la fonction getPlanning
  onSelectRoomPlanning() {
    this.getPlanning(this.selectedRoom.roomId, this.selectedDate);
  }

  //au changement de la date, on change la valeur de la date et on appel la fonction getPlanning
  onSelectDatePlanning(event) {
    this.selectedDate = event.value;
    this.getPlanning(this.selectedRoom.roomId, this.selectedDate);
  }

  //inialise le tableau des jours de la semaine, le 1er jour de la semaine et le dernier pour les paramètres de la fonction getReservationsOfThisWeek
  getPlanning(roomId, selectedDate) {
    //recupère les jours de la semaine pour le header en affichage
    this.getDaysOfThisWeek(selectedDate);

    //récupère le lundi de la semaine du jour sélectionné
    let startWeek = this.findStartOfWeek(selectedDate);

    //récupère le dimanche de la semaine du jour sélectionné
    let endWeek = this.findEndOfWeek(selectedDate);

    //appel à l'API pour récupèrer les reservations en base
    this.getReservationsOfThisWeek(roomId, startWeek, endWeek);
  }

  //Appel à l'api
  getReservationsOfThisWeek(salleId, startDate, endDate) {
    this.reservationService
      .getReservationsOfThisWeek(salleId, startDate, endDate)
      .subscribe(data => {
        this.listeReservation = data['result'];
        console.log(this.listeReservation);
        //Traitement de la liste de réservation et création du tableau planning
        this.createBookingListsbyDay(this.listeReservation);
      })
  }

  //retourne la date du lundi de la semaine du jour selectionné
  findStartOfWeek(date) {
    return moment(date).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).isoWeekday(1).format();
  }

  //retourne la date du dimanche de la semaine du jour selectionné
  findEndOfWeek(date) {
    return moment(date).set({ hour: 23, minute: 59, second: 59, millisecond: 0 }).isoWeekday(7).format();
  }

  //retourne un tableau avec la date des jours de la semaine selectionnée
  getDaysOfThisWeek(date) {
    this.weekDays = [];
    for (var i = 1; i < 6; i++) {
      this.weekDays.push(moment(date).locale('fr').isoWeekday(i).format('dddd DD MMM'));
    }
  }

  //créer des listes en fonction des jours du tableau daysOfPlanning (qui est un tableau de jour de la semaine)
  //ca met les reservations dans une liste en fonction du jour de la semaine
  //en gros ca trie la liste des réservations en fonction du jour de la semaine
  createBookingListsbyDay(liste) {

    //initialisation du tableau planning avec des valeurs "null"
    var objet = null;

    for (var i = 0; i < 5; i++) {
      this.bookingsOfTheWeek[i] = [];
    }

    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 20; j++) {
        this.bookingsOfTheWeek[i].push(objet);
      }
    }

    // pour chaque réservation de la liste, on lui donne une variable "day" dont la valeur correspond au jour de la semaine (lundi = 0, mardi= 1, ect)
    // puis on appelle la fonction sortReservationOfTheDayByHours
    for (const element of liste) {
      let day = 0;;

      switch (moment(element.startDate).locale('fr').format('dddd')) {
        case 'lundi': day = 0; break;
        case 'mardi': day = 1; break;
        case 'mercredi': day = 2; break;
        case 'jeudi': day = 3; break;
        case 'vendredi': day = 4; break;
      }

      this.sortReservationOfTheDayByHours(day, element);
    }
    return this.bookingsOfTheWeek;
  }

  // on cherche quand démarre la réunion donc on cherche l'index dans le tableau correspondant
  // et on remplace la valeur null autant de fois que la réservation dure
  sortReservationOfTheDayByHours(day, element) {
    // on cherche l'heure de début, l'heure de fin et la durée de la réservation en minutes
    let hDebut = new Date(element.startDate).getUTCHours() * 60 + new Date(element.startDate).getUTCMinutes();
    let hFin = new Date(element.endDate).getUTCHours() * 60 + new Date(element.endDate).getUTCMinutes();
    let dureeResa = (hFin - hDebut);

    //on démarre le compteur de minute à 8h donc 480 minutes
    let compteurMinute = 480;
    //on démarre le compteur d'index à 0
    let compteurIndex = 0;

    //iteration pour savoir quand remplir le tableau:
    //On ajoute 30 minutes au compteur de minutes tant que le compteur de minute est différent de l'heure de début
    //Tant que la condition on ajoute 1 au compteur d'index. On aura alors la valeur de l'index ou il faut ajouter la réservation
    while (hDebut != compteurMinute) {
      compteurMinute = compteurMinute + 30;
      compteurIndex = compteurIndex + 1;
    }

    //on remplit le tableau à l'index calculé et on le remplit autant de fois que la condition le peut (en fonction de la durée de la réservation)
    for (let k = 0; k < dureeResa; k = k + 30) {
      this.bookingsOfTheWeek[day][compteurIndex] = element;
      compteurIndex = compteurIndex + 1;
    }
  }

  //bouton pour aller à la semaine précédente
  previousWeek() {
    this.selectedDate = new Date(moment(this.selectedDate).subtract(7, 'days').format());
    this.getPlanning(this.selectedRoom.roomId, this.selectedDate);
  }

  //bouton pour aller à la semaine suivante
  nextWeek() {
    this.selectedDate = new Date(moment(this.selectedDate).add(7, 'days').format());
    this.getPlanning(this.selectedRoom.roomId, this.selectedDate);
  }

  */

  //STEP FINAL
  deleteBooking(booking) {
    console.log(booking);

  }
/*
  sendToVerification() {
    console.log('Réservation : ');
    console.log(this.selectedRoom);
    console.log(this.selectedObjet);
    console.log(this.selectedStartDate);
    console.log(this.selectedHourStart + ':' + this.selectedMinuteStart);
    if (this.selectedEndDate) console.log(this.selectedEndDate);
    console.log(this.selectedHourEnd + ':' + this.selectedMinuteEnd);
    this.dsBooking = new MatTableDataSource<Booking>();
  }
*/
  updateBookingsVerification() {
    this.dsBooking.data = null;
    this.roomService.getRooms().subscribe(
      (response) => {
        this.dsBooking.data = (response['result']);
      })
  }

}