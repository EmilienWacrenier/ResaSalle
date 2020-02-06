import { Component, OnInit, Inject } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-reservation-recurrence',
  templateUrl: './confirmation-reservation-recurrence.component.html',
  styleUrls: ['./confirmation-reservation-recurrence.component.scss']
})
export class ConfirmationReservationRecurrenceComponent implements OnInit {
  labelRecurrence: string;
  startDateRecurrence: string;
  endDateRecurrence: string;
  listeReservations: [];
  listeReservationsWithConflit: [];
  baseMessage: string;
  someConflict: boolean = false;

  constructor(
    public router: Router,
    public dialogRef: MatDialogRef<ConfirmationReservationRecurrenceComponent>,
    private reservationService: ReservationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.labelRecurrence = data.labelRecurrence;
    this.startDateRecurrence = data.startDateRecurrence;
    this.endDateRecurrence = data.endDateRecurrence;
    this.listeReservations = data.listeReservations;
    this.listeReservationsWithConflit = data.listeReservationsWithConflit;
  }

  ngOnInit() {
    console.log(this.listeReservationsWithConflit);
    if(this.listeReservationsWithConflit.length > 0){ this.someConflict = true; }
    else this.someConflict = false;
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  onSubmit() {

    const reservation = {
      labelRecurrence: this.data.labelRecurrence,
      startDateRecurrence: this.data.startDateRecurrence,
      endDateRecurrence: this.data.endDateRecurrence,
      listeReservations: this.data.listeReservations
    }

    console.log(reservation);
    
    this.reservationService.createReservationRecurrence(reservation).subscribe(
      (response) => {
        console.log(response);
        console.log("Réservations sans conflits créées");
        setTimeout( () => this.dialogRef.close(), 500 );
        this.router.navigate(['/dashboard'])
      },
      (error) => {
        this.baseMessage = error;
        console.log(error);
      }
    );
  }

}
