import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Inject } from '@angular/core';

import * as moment from 'moment';

import { BOOKING_HOURS, BOOKING_MINUTES } from '../../constantes/constantes'
import { User } from '../../classes/user';
import { Booking } from '../../classes/booking';

import { UserService } from 'src/app/services/user.service';
import { ReservationService } from '../../services/reservation.service'
import { SearchDataServiceService } from 'src/app/services/search-data-service.service';
import {CriteresComponent} from 'src/app/pages/search/criteres/criteres.component';
import { ToastrService } from 'ngx-toastr';
import { ApiConstants } from 'src/app/constantes/constantes';


@Component({
  selector: 'app-confirmation-reservation',
  templateUrl: './confirmation-reservation.component.html',
  styleUrls: ['./confirmation-reservation.component.scss']
})
export class ConfirmationReservationComponent implements OnInit {

  title: string;
  message: string;
  roomName: string;

//variables heures date de début
startFullStartDate:string;
startFullEndHour:string;

modalobject:string;

  constructor(public dialogRef: MatDialogRef<ConfirmationReservationComponent>,
    private toastr: ToastrService,
    private cst: ApiConstants,
    private reservationService : ReservationService,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationReservation,
    private searchDataService : SearchDataServiceService,) {
    this.title = data.title;
    this.message = data.message;
    this.roomName = data.roomName;
    this.startFullStartDate=data.fullStartDate; 
    this.startFullEndHour=data.fullEndDate;
    this.modalobject=data.object;
  } 

  ngOnInit() {  
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
     const reservation = {
      startDate : this.startFullStartDate,
      endDate : this.startFullEndHour,
      object : this.modalobject,
      roomId: this.roomName
    } 
    this.reservationService.createReservation(reservation).subscribe(
      (response) => {
        this.toastr.success(`Réservation validé !`, this.cst.toastrTitle, this.cst.toastrOptions);
       this.dialogRef.close();  
        /* this.createReservation(); */
      },
      (error) => {
        this.toastr.error(error.error['result'], this.cst.toastrTitle, this.cst.toastrOptions);
       /*  this.createReservation(); */
       
      }
    );
  } 

}
export class ConfirmationReservation {
  constructor(public title: string, public message: string, public roomName: string,public fullStartDate: string, public fullEndDate:string, public object:string) { }
}
