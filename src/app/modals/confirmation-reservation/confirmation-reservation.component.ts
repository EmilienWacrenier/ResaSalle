import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Inject } from '@angular/core';
import * as moment from 'moment';
import { ReservationService } from '../../services/reservation.service'
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
  startDateDisplay: string;
  endDateDisplay: string;

  modalobject: string;

  userId: number;

  constructor(public dialogRef: MatDialogRef<ConfirmationReservationComponent>,
    private toastr: ToastrService,
    private cst: ApiConstants,
    private reservationService: ReservationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.title = data.title;
    this.roomName = data.room.name;
    this.modalobject = data.object;
    this.startDateDisplay = moment(data.startDate).locale("fr").format('dddd Do MMMM YYYY [de] H[h]mm')
    this.endDateDisplay = moment(data.endDate).locale("fr").format('[ à] H[h]mm');
    this.userId = data.userId
  }

  ngOnInit() {
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const reservation = {
      startDate: this.data.startDate,
      endDate: this.data.endDate,
      object: this.data.object,
      roomId: this.data.room.roomId.toString(),
      userId: this.data.userId.toString()
    }
    this.reservationService.createReservation(reservation).subscribe(
      (response) => {
        this.toastr.success(`Réservation validé !`, this.cst.toastrTitle, this.cst.toastrOptions);
        this.dialogRef.close();
      },
      (error) => {
        this.toastr.error(error.error['result'], this.cst.toastrTitle, this.cst.toastrOptions);
      }
    );
  }
}
