import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Booking } from 'src/app/classes/booking';

@Component({
  selector: 'app-feedback-conflit-recurrence',
  templateUrl: './feedback-conflit-recurrence.component.html',
  styleUrls: ['./feedback-conflit-recurrence.component.scss']
})
export class FeedbackConflitRecurrenceComponent implements OnInit {

  //variable pour le planning
  listeReservation: Booking[];
  weekDays: any[];
  bookingsOfTheWeek: any;

  dsBooking: MatTableDataSource<Booking>;
  displayedColumns: string[] = ['date', 'startDate', 'endDate', 'room'];

  constructor() { }

  ngOnInit() {
  }

  //STEP FINAL
  deleteBooking(booking) {
    console.log(booking);

  }

  updateBookingsVerification() {
    this.dsBooking.data = null;
    /*this.reservationService.getCheckReservation().subscribe(
      (response) => {
        this.dsBooking.data = (response['result']);
      })*/
  }
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



}
