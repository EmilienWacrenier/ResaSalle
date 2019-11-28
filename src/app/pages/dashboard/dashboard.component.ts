import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { Booking } from 'src/app/classes/booking';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { DeleteConfirmationComponent, ConfirmDeleteModel } from '../../modals/delete-confirmation/delete-confirmation.component';

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

  constructor(private reservationService: ReservationService, public dialog: MatDialog) { }
  reservations$: Observable<Booking[]>;
  displayedColumns: string[] = ['date', 'start', 'end', 'room', 'subject', 'participants', 'actions'];
  dataSource = [];

  ngOnInit() {
    this.reservationService.getReservationsFromUserConnected()
      .subscribe((response) => { this.dataSource = response['result']; console.log(this.dataSource) });
  }

  /*getReservationsbyUser(): Observable<Booking[]> {
    this.reservationService.getReservationsFromUserConnected();
  }*/

  deleteBooking(j): void {
    const message = 'Souhaitez-vous vraiment supprimer cette réservation ? \n La suppression sera définitive';

    const dialogData = new ConfirmDeleteModel("Supprimer une réservation", message);

    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '400px',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        // DO SOMETHING
      }
    });
  }

  editBooking(j) {
    console.log(this.dataSource[j]);
  }
}
