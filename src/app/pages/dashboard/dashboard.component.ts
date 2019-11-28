import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { Booking } from 'src/app/classes/booking';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { DeleteConfirmationComponent, ConfirmDeleteModel } from '../../modals/delete-confirmation/delete-confirmation.component';
import { MatTableDataSource } from '@angular/material';

import { ToastrService, ToastRef } from 'ngx-toastr';
import { ApiConstants } from '../../constantes/constantes';

export interface Reservation {
  date: string;
  start: string;
  end: string;
  room: string;
  subject: string;
  participants: number;
}

const ELEMENT_DATA: Reservation[] = [
  { date: '10 juin', start: '10:00', end: '10:30', room: 'H', subject: 'Réunion', participants: 4 },
  { date: '11 juin', start: '10:00', end: '10:30', room: 'H', subject: 'Réunion', participants: 4 },
  { date: '12 juin', start: '10:00', end: '10:30', room: 'H', subject: 'Réunion', participants: 4 },
  { date: '13 juin', start: '10:00', end: '10:30', room: 'H', subject: 'Réunion', participants: 4 },
  { date: '14 juin', start: '10:00', end: '10:30', room: 'H', subject: 'Réunion', participants: 4 },
  { date: '15 juin', start: '10:00', end: '10:30', room: 'H', subject: 'Réunion', participants: 4 },
  { date: '16 juin', start: '10:00', end: '10:30', room: 'H', subject: 'Réunion', participants: 4 },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  dsBooking: MatTableDataSource<Booking>;
  reservations$: Observable<Booking[]>;
  displayedColumns: string[] = ['date', 'start', 'end', 'room', 'subject', 'participants', 'actions'];
  dataSource$: Observable<Booking[]>;

  constructor(private reservationService: ReservationService, public dialog: MatDialog, private cst: ApiConstants, private toastr: ToastrService) {
    this.dsBooking = new MatTableDataSource<Booking>();
  }



  ngOnInit() {
    this.updateReservations();
  }

  /*getReservationsbyUser(): Observable<Booking[]> {
    this.reservationService.getReservationsFromUserConnected();
  }*/

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

  editBooking(j) {
    console.log(this.dataSource$[j]);
  }

  updateReservations() {
    this.dsBooking.data = null;
    this.reservationService.getReservationsFromUserConnected().subscribe(
      (response) => {
        this.dsBooking.data = (response['result']);
        console.log(this.dsBooking.data)
      }
    );
  }

  /*displayReservations(){
    this.reservationService.getReservationsFromUserConnected()
    .subscribe((response) => { this.dataSource = response['result']; console.log(this.dataSource) });
  }*/
}
