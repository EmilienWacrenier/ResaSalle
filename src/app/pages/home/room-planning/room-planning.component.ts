import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Room } from '../../../classes/room'
import { Booking } from '../../../classes/booking'
import { HomeService } from '../../../services/home.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { BookingdetailsComponent } from 'src/app/modals/bookingdetails/bookingdetails.component';

import { JOUR_SEMAINE, HOURS_PLANNING } from '../../../constantes/constantes'
import * as moment from 'moment'
import { ReservationService } from 'src/app/services/reservation.service';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-room-planning',
  templateUrl: './room-planning.component.html',
  styleUrls: ['./room-planning.component.scss']
})
export class RoomPlanningComponent implements OnInit {

  daysOfPlanning: string[] = JOUR_SEMAINE;
  hoursOfPlanning: string[] = HOURS_PLANNING;

  room: Room;
  salle: Room;
  rooms: Room[];

  idRoomOnInit: number;

  selectedRoom : Room;
  //variable pour la date et les heures
  selectedDate: Date;
  startDay: string;
  endDay: string;

  //tableau qui récupère les 5 jours de la semaine
  //en fonction de la date selectionnée
  weekDays: string[] = [];

  listeReservation: Booking[];

  bookingsOfTheWeek = [];

  constructor(
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private homeService: HomeService,
    private router: Router,
    private location: Location,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    document.getElementById('homeNavItem').classList.add('active-list-item');

    //récupération des salles en base
    this.homeService.getRooms().subscribe( res => {
      this.rooms = res;

      for(const room of this.rooms){
        //recuperation des infos de la salle cliqué pour l'initiation
        if( room.roomId == +this.route.snapshot.paramMap.get('id')) {
          this.selectedRoom = room;
        }
      }
      //date d'aujourd'hui
      this.selectedDate = new Date();

      this.getPlanning(this.selectedRoom.roomId, this.selectedDate);
    });
  }

  onSelectRoom(){
    this.getPlanning(this.selectedRoom.roomId, this.selectedDate);
  }

  //à la selection de la date
  onSelectDate(event) {
    this.selectedDate = event.value;
    this.getPlanning(this.selectedRoom.roomId, this.selectedDate);
  }

  getPlanning(roomId, selectedDate){
    //recupère les jours de la semaine pour le header
    this.weekDays = this.getDaysOfThisWeek(selectedDate);

    //récupère le lundi de la semaine du jour sélectionné
    this.startDay = this.findStartOfWeek(selectedDate);

    //récupère le vendredi de la semaine du jour sélectionné
    this.endDay = this.findEndOfWeek(selectedDate);

    //récupère les jours du lundi au vendredi de la semaine
    //du jour selectionné pour l'affichage
    this.getDaysOfThisWeek(selectedDate);

    //appel à l'API pour récupèrer les reservations en base
    //id_reservation
    //date_debut
    //date_fin
    //objet
    //etat, 
    //user_id, 
    //reccurrence_id, 
    //salle_id, 
    //id_salle, nom, zone, capacite
    this.getReservationsOfThisWeek(roomId, this.startDay, this.endDay);
  }

  //Appel à l'api
  getReservationsOfThisWeek(salleId, startDate, endDate) {
    this.reservationService
      .getReservationsOfThisWeek(salleId, startDate, endDate)
      .subscribe(data => {
        this.listeReservation = data['result'];
        console.log(this.listeReservation);
        //traitement des données
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
    return this.weekDays;
  }

  //créer des listes en fonction des jours du tableau daysOfPlanning (qui est un tableau de jour de la semaine)
  //ca met les reservations dans une liste en fonction du jour de la semaine
  //en gros ca trie la liste des réservations en fonction du jour de la semaine
  createBookingListsbyDay(liste) {
    var objet = null;

    for (var i = 0; i < 5; i++) {
      this.bookingsOfTheWeek[i] = [];
    }

    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 20; j++) {
        this.bookingsOfTheWeek[i].push(objet);
      }
    }

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

  sortReservationOfTheDayByHours(day, element) {
    let hDebut = new Date(element.startDate).getUTCHours() * 60 + new Date(element.startDate).getUTCMinutes();
    let hFin = new Date(element.endDate).getUTCHours() * 60 + new Date(element.endDate).getUTCMinutes();
    let dureeResa = (hFin - hDebut);

    let compteurMinute = 480;
    let compteurIteration = 0;

    //iteration pour savoir quand remplir le tableau
    while (hDebut != compteurMinute) {
      compteurMinute = compteurMinute + 30;
      compteurIteration = compteurIteration + 1;
    }

    //savoir combien de fois remplir le tableau par rapport à la longueur de la resa
    for (let k = 0; k < dureeResa; k = k + 30) {
      this.bookingsOfTheWeek[day][compteurIteration] = element;
      compteurIteration = compteurIteration + 1;
    }
  }

  previousWeek(){
    this.selectedDate = new Date( moment(this.selectedDate).subtract(7, 'days').format() );
    this.getPlanning(this.selectedRoom.roomId, this.selectedDate);
  }

  nextWeek(){
    this.selectedDate = new Date( moment(this.selectedDate).add(7, 'days').format() );
    this.getPlanning(this.selectedRoom.roomId, this.selectedDate);
  }

  //fermeture de la modale avec DialogRef
  openDialog(day, hour) {
    //config et ouverture de la 2eme test_modaleconst bookingCalendarDialogConfig = new MatDialogConfig();
    const bookingDetailsDialogConfig = new MatDialogConfig();
    bookingDetailsDialogConfig.width = "60vw";
    bookingDetailsDialogConfig.height = "80vh";
    bookingDetailsDialogConfig.data = { 
      room: this.selectedRoom,
      selectedDate : this.selectedDate,
      day : day,
      hour: hour,
     };

    this.dialog.open(BookingdetailsComponent, bookingDetailsDialogConfig)
      .afterClosed().subscribe((data) => {
        console.log(data);
        this.getPlanning(data.roomId, data.selectedDate);
      });
  }

  //BOUTON BACK
  goBack() {
    document.getElementById('homeNavItem').classList.remove('active-list-item');
    this.router.navigate(['']);
  }
}
