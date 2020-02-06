import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { RoomService } from 'src/app/services/room.service';
import { Booking } from 'src/app/classes/booking';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DeleteConfirmationComponent, ConfirmDeleteModel } from '../../modals/delete-confirmation/delete-confirmation.component';
import { MatTableDataSource } from '@angular/material';

import { ToastrService, ToastRef } from 'ngx-toastr';
import { ApiConstants } from '../../constantes/constantes';

import * as moment from 'moment'
import { EditBookingModel, EditBookingComponent } from 'src/app/modals/edit-booking/edit-booking.component';
import { Room } from 'src/app/classes/room';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  reservations: Booking[];
  reservationsFilteredByObject : Booking[];

  rooms: Room[];

  selectedRoomId: number = 1;

  isRecurrence: boolean = false;

  constructor(
    private reservationService: ReservationService,
    private roomService: RoomService,
    public dialog: MatDialog,
    private cst: ApiConstants,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.updateReservations();
  }

  getRooms() {
    this.roomService.getRooms().subscribe(res => {
      this.rooms = res['result'];
    })
  }

  getSelectedRoom(roomId) {
    this.selectedRoomId = roomId;
  }

  deleteBooking(reservationId): void {
    const message = 'Souhaitez-vous vraiment supprimer cette réservation ? \n La suppression sera définitive';

    const dialogData = new ConfirmDeleteModel("Supprimer une réservation", message);

    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '400px',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        console.log(reservationId);
        // DO SOMETHING
        this.reservationService.removeReservation(reservationId).subscribe(
          (response) => {
            var a = response['result'];
            console.log('Result de remove :');
            console.log(a);
            this.toastr.success('Réservation supprimée !', this.cst.toastrTitle, this.cst.toastrOptions);

            this.updateReservations();
          },
          (error) => {
            console.log('Erreur Suppression ! : ' + error.error['result']);
            this.toastr.error(error.error['result'], this.cst.toastrTitle, this.cst.toastrOptions);

            this.updateReservations();
          }
        );
      }
    });
  }

  editBooking(booking) {
    console.log(booking);
    const dialogData = new EditBookingModel(booking);

    const dialogRef = this.dialog.open(EditBookingComponent, {
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(
      () => this.updateReservations()
    );
  }

  updateReservations() {
    this.reservationService.getReservationsFromUserConnected().subscribe(
      (response) => {
        console.log(response);
        this.reservations = response['result'];
      }
    );
  }
}
