import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Inject } from '@angular/core';

import { BOOKING_HOURS, BOOKING_MINUTES } from '../../constantes/constantes'
import { Room } from 'src/app/classes/room';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ReservationService } from '../../services/reservation.service'
import { Booking } from '../../classes/booking';
import * as moment from 'moment';

@Component({
  selector: 'app-bookingdetails',
  templateUrl: './bookingdetails.component.html',
  styleUrls: ['./bookingdetails.component.scss']
})

export class BookingdetailsComponent implements OnInit {

  room;

  selectedMiniatures: string[]; //affichage des miniatures cf méthode onSelect()
  users: User[] = [ //liste d'utilisateurs pour test
    {
      lastName: 'amri',
      firstName: 'virginie',
      miniature: 'AV'
    },
    {
      lastName: 'pascal',
      firstName: 'marie flore',
      miniature: 'PMF'
    },
    {
      lastName: 'henry',
      firstName: 'stephanie',
      miniature: 'HS'
    },
    {
      lastName: 'villeminot',
      firstName: 'fabien',
      miniature: 'VF'
    },
    {
      lastName: 'boulo',
      firstName: 'lionel',
      miniature: 'BL'
    }
  ];

  bookingHours: number[] = BOOKING_HOURS;
  bookingMinutes: number[] = BOOKING_MINUTES;

  selectedDate: Date;
  selectedHourStart:number;
  selectedMinuteStart:number;
  selectedHourEnd:number;
  selectedMinuteEnd:number;
  objet: string;

  constructor(
    private reservationService: ReservationService,
    public bookingDetailsDialogRef: MatDialogRef<BookingdetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) {
    }

  ngOnInit() {
    this.room = this.data.room;
    console.log(this.room.name);
  }

  close() {
    this.bookingDetailsDialogRef.close();
  }
  //Affichage des vignettes
  //parcours d'une collection de users selectionnés et insertion de value cf hmtl l.23 [value]="user.miniature"
  onSelect(v) {
    this.selectedMiniatures = [];
    for (let a of v) {
      this.selectedMiniatures.push(a.value);
    }
  }

  onSubmit(){
    
    let startDate = moment(this.selectedDate).hour(this.selectedHourStart).minute(this.selectedMinuteStart).format("YYYY-MM-DD hh:mm:ss");
    let endDate = moment(this.selectedDate).hour(this.selectedHourEnd).minute(this.selectedMinuteEnd).format("YYYY-MM-DD hh:mm:ss");
    console.log(
      "startDate : " + startDate + " . endDate : " + endDate
    )

    const reservation: Booking = {
      startDate: startDate,
      endDate: endDate,
      objet: this.objet,
      user_id: 1,
      salle_id: this.room.id
    };
    
    this.reservationService.createReservation(reservation);
  }
  


}
//Interface User pour test (liste d'utilisateurs factice)
export interface User {
  lastName: string;
  firstName: string;
  miniature: string;
}
