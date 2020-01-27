import { Component, OnInit } from '@angular/core';

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
import { Booking } from 'src/app/classes/booking';
import { Room } from 'src/app/classes/room';
import { ReservationService } from 'src/app/services/reservation.service';
import { User } from 'src/app/classes/user';

import * as moment from 'moment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  currentUser: User;

  recurrenceIsChecked: boolean = false;
  critereAreGood: boolean = false;

  startDateWithHours: string;
  endDateWithHours: string;

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    console.log(this.recurrenceIsChecked);
  }

  onChangeRecurrence($event) {
    this.recurrenceIsChecked = $event;
    console.log(this.recurrenceIsChecked);
  }
}



