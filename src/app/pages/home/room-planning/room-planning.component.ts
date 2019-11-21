import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Room } from '../../../classes/room'
import { HomeService } from '../../../services/home.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { BookingdetailsComponent } from 'src/app/modals/bookingdetails/bookingdetails.component';

import { JOUR_SEMAINE, HOURS_PLANNING } from '../../../constantes/constantes'
import * as moment from 'moment'
import { ReservationService } from 'src/app/services/reservation.service';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-room-planning',
  templateUrl: './room-planning.component.html',
  styleUrls: ['./room-planning.component.scss']
})
export class RoomPlanningComponent implements OnInit {

  room: Room;
  daysOfPlanning: string[] = JOUR_SEMAINE;
  hoursOfPlanning: string[] = HOURS_PLANNING;

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
    this.getRoomPlanning();
    /*console.log(this.room);*/

    this.weekDays = this.getDaysOfThisWeek(this.selectedDate);
  }

  //variable pour la date et les heures
  selectedDate: Date;
  debutSemaine: string;
  finSemaine: string;
  bookingOfTheWeek;
  weekDays: string[] = [];
  reservationOfTheWeek: any;

  //fonction qui va changer la valeur de la date selectionnée quand on
  //selectionne une date dans le calendrier puis qui appelle des fonctions
  onSelect(event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = event.value;
    console.log(this.selectedDate);
    //recupère les jours de la semaine pour le header
    this.weekDays = this.getDaysOfThisWeek(this.selectedDate);
    this.reservationOfTheWeek = this.setReservationOfThisWeek(this.selectedDate);
  }

  //ca trouve la date du lundi de la semaine du jour selectionné
  findStartOfWeek(date) {
    this.debutSemaine = moment(date).isoWeekday(1).format();
    console.log("debut semaine : " + this.debutSemaine);
  }

  //ca trouve la date du dimanche de la semaine du jour selectionné
  findEndOfWeek(date) {
    this.finSemaine = moment(date).isoWeekday(7).format();
    console.log("fin semaine : " + this.finSemaine);
  }

  //retourne un tableau avec la date des jours de la semaine selectionnée
  getDaysOfThisWeek(date) {
    this.weekDays = [];
    for (var i = 1; i < 6; i++) {
      this.weekDays.push(moment(date).locale('fr').isoWeekday(i).format('dddd DD MMM'));
    }
    console.log(this.weekDays);
    return this.weekDays;
  }

  getReservationsOfThisWeek(startDate, endDate, salleId) {
    let param = {
      startDate : startDate,
      endDate : endDate,
      salleId : salleId
    }
    return this.reservationService.getReservationsOfThisWeek(param);
  }
  //créer des listes en fonction des jours du tableau daysOfPlanning (qui est un tableau de jour de la semaine)
  //ca met les reservations dans une liste en fonction du jour de la semaine
  //en gros ca trie la liste des réservations en fonction du jour de la semaine
  createBookingListsbyDay(liste) {
    for (const element of liste) {
      let day = 0;
      switch (moment(element.startDate).format('dddd')) {
        case 'lundi':
            day = 1;
            this.sortReservationOfTheDayByHours(day, element);
          ;
          break;
        case 'mardi':
            day = 2;
            this.sortReservationOfTheDayByHours(day, element);
          ;
          break;
        case 'mercredi':
            day = 3;
            this.sortReservationOfTheDayByHours(day, element);
          ;
          break;
        case 'jeudi':
            day = 4;
            this.sortReservationOfTheDayByHours(day, element);
          ;
          break;
        case 'vendredi':
            day = 5;
            this.sortReservationOfTheDayByHours(day, element);
          ;
          break;
      }
    }
  }

  sortReservationOfTheDayByHours(day, element) {
    let hDebut = new Date(element.starDate).getTime() * 60000;
    let hFin = new Date(element.endDate).getTime() * 60000;
    let dureeResa = (hFin - hDebut) % 1800;
    let compteurMinute = 0;
    let compteurIteration = 0;

    //iteration pour savoir quand remplir le tableau
    while (hDebut != compteurMinute) {
      compteurMinute += 1800;
      compteurIteration += 1;
    }

    //savoir combien de fois remplir le tableau par rapport à la longueur de la resa
    for (let k = 0; k < dureeResa; k++) {
      this.bookingOfTheWeek[day][compteurIteration].push(element);
    }
  }

  setReservationOfThisWeek(selectedDate) {
    this.bookingOfTheWeek = [];
    let startDate = this.findStartOfWeek(selectedDate)
    let endDate = this.findEndOfWeek(selectedDate)
    let salleId = this.room.id;
    let reservationOfTheWeek = this.getReservationsOfThisWeek(startDate, endDate, salleId);
    return this.createBookingListsbyDay(reservationOfTheWeek);
  }

  //fermeture de la modale avec DialogRef
  openDialog() {
    //config et ouverture de la 2eme test_modaleconst bookingCalendarDialogConfig = new MatDialogConfig();
    const bookingDetailsDialogConfig = new MatDialogConfig();
    bookingDetailsDialogConfig.width = "50%";
    bookingDetailsDialogConfig.height = "80%";
    bookingDetailsDialogConfig.data = { room: this.room };
    this.dialog.open(BookingdetailsComponent, bookingDetailsDialogConfig);
  }

  goBack() {
    document.getElementById('homeNavItem').classList.remove('active-list-item');
    this.router.navigate(['']);
  }

  getRoomPlanning(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.homeService.getRoomPlanning(id)
      .subscribe(room => this.room = room);
  }
}
