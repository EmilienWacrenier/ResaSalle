import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Room } from '../../../classes/room'
import { Booking } from '../../../classes/booking'

import { RoomService } from '../../../services/room.service';
import { ReservationService } from 'src/app/services/reservation.service';

import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { BookingdetailsComponent } from 'src/app/modals/bookingdetails/bookingdetails.component';

import { JOUR_SEMAINE, HOURS_PLANNING } from '../../../constantes/constantes'

import * as moment from 'moment'
import { PlanningService } from 'src/app/services/planning.service';
import { HoursFeedbackStepComponent } from 'src/app/modals/hours-feedback-step/hours-feedback-step.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-room-planning',
  templateUrl: './room-planning.component.html',
  styleUrls: ['./room-planning.component.scss']
})
export class RoomPlanningComponent implements OnInit {

  @Input() reservationSearchFeedback: any;
  @Input() indexReservation: number;

  @Output() reservationToChange = new EventEmitter<{reservation : any, indexReservation : number}>();

  //jour de la semaine du planning
  daysOfPlanning: string[] = JOUR_SEMAINE;

  //heures du planning
  hoursOfPlanning: string[] = HOURS_PLANNING;

  //liste des salles
  rooms: Room[];

  //variable pour stocker la salle selectionnée
  selectedRoom: Room;

  //variable pour stocker la date sélectionnée
  selectedDate: Date;

  //tableau qui récupère les 5 jours de la semaine en fonction de la date selectionnée
  weekDays: string[] = [];

  //tableau d'objets Booking qui sert à stocker la réponse de l'API
  listeReservation: Booking[];

  //Tableau planning : tableau de 5 entrées qui contiennent un tableau à 20 entrées
  bookingsOfTheWeek = [];

  //roomId recupérer du component HOME via service
  roomIdFromHomeComponent: number = 0;

  constructor(
    private reservationService: ReservationService,
    private roomService: RoomService,
    public dialog: MatDialog,
    private planningService: PlanningService,
    private route : Router
  ) { }

  ngOnInit() {
    document.getElementById('homeNavItem').classList.add('active-list-item');
    
    let isSearch = this.route.url.includes('search');

    console.log("isSearch = " + isSearch);

    if (!isSearch) {
      console.log("init home");
      this.initPlanningHome();

    }
    else {
      console.log("init search");
      this.initPlanningSearch();
    }
  }

  initPlanningSearch() {
    this.roomService.getRooms().subscribe(res => {
      this.rooms = res['result'];

      for (const room of this.rooms) {
        if (room.roomId == this.reservationSearchFeedback.roomId) {
          this.selectedRoom = room;
        }
      }
      if (!this.selectedRoom || this.selectedRoom == undefined || this.selectedRoom == null) {
        this.selectedRoom = this.rooms[0];
      }
      this.selectedDate = new Date(this.reservationSearchFeedback.startDate);

      this.getPlanning(this.selectedRoom.roomId, this.selectedDate);
    });
  }

  initPlanningHome() {
    this.planningService.roomId$.subscribe(res => {

      this.roomIdFromHomeComponent = res;
      console.log(this.roomIdFromHomeComponent);
      //récupération des salles en base
      this.roomService.getRooms().subscribe(res => {
        this.rooms = res['result'];
        console.log(this.rooms);

        //pour instancier le planning avec la salle sélectionnée dans le component précédent (home),
        //on fait passer l'ID de la salle dans l'URL
        //on parcourt la liste des salles et on checke jusqu'à ce que l'ID récupéré dans l'URL correspond à celui dans la liste
        //une fois que les ID matchent, on inialise la variable selectedRoom avec la salle matchée dans la liste.
        for (const room of this.rooms) {
          if (room.roomId == this.roomIdFromHomeComponent) {
            this.selectedRoom = room;
          }
        }
        if (!this.selectedRoom || this.selectedRoom == undefined || this.selectedRoom == null) {
          this.selectedRoom = this.rooms[0];
        }
        console.log(this.selectedRoom);
        //on initialise la date sélectionnée à la date d'aujourd'hui
        this.selectedDate = new Date();

        this.getPlanning(this.selectedRoom.roomId, this.selectedDate);
      });
    });
  }

  //au changement de salle, on change le planning en fonction de la salle selectionnée en appelant la fonction getPlanning
  onSelectRoom() {
    this.getPlanning(this.selectedRoom.roomId, this.selectedDate);
  }

  //au changement de la date, on change la valeur de la date et on appel la fonction getPlanning
  onSelectDate(event) {
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
    return moment(date).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).isoWeekday(1).format('YYYY-MM-DD HH:mm:ss');
  }

  //retourne la date du dimanche de la semaine du jour selectionné
  findEndOfWeek(date) {
    return moment(date).set({ hour: 23, minute: 59, second: 59, millisecond: 0 }).isoWeekday(7).format('YYYY-MM-DD HH:mm:ss');
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
    let hDebut = new Date(element.startDate).getHours() * 60 + new Date(element.startDate).getMinutes();
    let hFin = new Date(element.endDate).getHours() * 60 + new Date(element.endDate).getMinutes();
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

  //modale de céation de la réservation, la fonction prend en paramètre day et hour qui sont récupéré dans la partie HTML
  //cela permet de préremplir les champs dans la modale en fonction de la case cliquée.
  openDialog(day, hour) {

    if (!this.reservationSearchFeedback || this.reservationSearchFeedback == undefined || this.reservationSearchFeedback == null) {
      console.log("init home");
      //config de ma modale :
      //dans la partie data : room et selectedDate sont explicites, day et hour correspondent aux valeurs récupérés en paramètre
      //venues du front. Ce sont des index de boucles ngFor.
      const bookingDetailsDialogConfig = new MatDialogConfig();
      bookingDetailsDialogConfig.width = "400px";
      bookingDetailsDialogConfig.data = {
        room: this.selectedRoom,
        selectedDate: this.selectedDate,
        day: day,
        hour: hour,
      };

      this.dialog.open(BookingdetailsComponent, bookingDetailsDialogConfig)
        .afterClosed().subscribe((data) => {
          console.log(data);
          this.getPlanning(data.roomId, data.selectedDate);
        });

    }
    else {
      console.log("init search");
      const hoursFeedbackStepDialogConfig = new MatDialogConfig();
      hoursFeedbackStepDialogConfig.width = "400px";
      hoursFeedbackStepDialogConfig.data = {
        reservation: this.reservationSearchFeedback,
        day: day,
        hour: hour,
        roomId: this.selectedRoom.roomId
      };

      this.dialog.open(HoursFeedbackStepComponent, hoursFeedbackStepDialogConfig)
        .afterClosed().subscribe((res) => {
          this.reservationSearchFeedback = res;
          this.reservationToChange.emit({reservation: this.reservationSearchFeedback, indexReservation : this.indexReservation})
        });
    }
  }
}
