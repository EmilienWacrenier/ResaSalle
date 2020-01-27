import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Inject } from '@angular/core';

import * as moment from 'moment';

import { BOOKING_HOURS, BOOKING_MINUTES } from '../../constantes/constantes'
import { User } from '../../classes/user';
import { Booking } from '../../classes/booking';

import { UserService } from 'src/app/services/user.service';
import { ReservationService } from '../../services/reservation.service'

@Component({
  selector: 'app-confirmation-reservation',
  templateUrl: './confirmation-reservation.component.html',
  styleUrls: ['./confirmation-reservation.component.scss']
})
export class ConfirmationReservationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
