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

    this.weekDays= this.displayDaysOfThisWeek(this.selectedDate);
  }

  //variable pour la date et les heures
  selectedDate: Date;
  debutSemaine: string;
  finSemaine: string;
  bookingOfThisDay;
  weekDays: string[] = [];

  onSelect(event) {
    this.selectedDate = event;
    this.findStartOfWeek(this.selectedDate);
    this.findEndOfWeek(this.selectedDate);
    this.weekDays= this.displayDaysOfThisWeek(this.selectedDate);
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
  displayDaysOfThisWeek(date){
    for(var i=1; i<6; i++){
      this.weekDays.push(moment(date).locale('fr').isoWeekday(i).format('dddd DD MMM'));
    }
    return this.weekDays;
  }

  //créer des listes en fonction des jours du tableau daysOfPlanning (qui est un tableau de jour de la semaine)
  //ca met les reservations dans une liste en fonction du jour de la semaine
  //en gros ca trie la liste des réservations en fonction du jour de la semaine
  createBookingListsbyDay(liste) {
    for (var i = 0; i < 4; i++) {

      switch (moment(liste[i].starDate).format('dddd')) {
        case 'lundi':
          this.bookingOfThisDay[0].push(liste[i]);
          ;
          break;
        case 'mardi':
            this.bookingOfThisDay[1].push(liste[i]);
          ;
          break;
        case 'mercredi':
            this.bookingOfThisDay[2].push(liste[i]);
          ;
          break;
        case 'jeudi':
            this.bookingOfThisDay[3].push(liste[i]);
          ;
          break;
        case 'vendredi':
            this.bookingOfThisDay[5].push(liste[i]);
          ;
          break;

      }

    }
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
