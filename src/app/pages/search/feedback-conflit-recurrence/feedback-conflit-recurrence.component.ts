import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ReservationService } from 'src/app/services/reservation.service';
import { SearchDataServiceService } from 'src/app/services/search-data-service.service';
import { ConfirmationReservationRecurrenceComponent } from 'src/app/modals/confirmation-reservation-recurrence/confirmation-reservation-recurrence.component';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-feedback-conflit-recurrence',
  templateUrl: './feedback-conflit-recurrence.component.html',
  styleUrls: ['./feedback-conflit-recurrence.component.scss']
})
export class FeedbackConflitRecurrenceComponent implements OnInit {

  @Input() user: User;
  //reponse avec la liste des reservations de la recurrence avec et sans conflit
  reservationsToCheck= [];
  listeReservations= [];

  object: string;
  labelRecurrence: string;
  startDateRecurrence: string;
  endDateRecurrence: string;

  

  constructor(
    private reservationService: ReservationService,
    private searchDataService: SearchDataServiceService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.searchDataService.listeReservationCheckRecurrence$.subscribe(
      (res) => {
        this.reservationsToCheck = res['result'];
        console.log(this.reservationsToCheck);
      }, (error) => {
      }
    )
  }

  //STEP FINAL
  deleteDate(i) {
    this.reservationsToCheck.splice(i, 1)
  }

  updateReservation(event) {
    const index = event.indexReservation;
    let newReservation = event.reservation;

    this.reservationService.getCheckReservation(newReservation.roomId, newReservation.startDate, newReservation.endDate)
      .subscribe(res => {
        this.reservationsToCheck[index] = res['result'];
      })
  }

  openReservationSimpleConfirmationModal() {
    this.searchDataService.recurrenceName$.subscribe(res => this.labelRecurrence = res);
    this.searchDataService.fullStartDate$.subscribe(res => this.startDateRecurrence = res);
    this.searchDataService.endDateRecurrence$.subscribe(res => this.endDateRecurrence = res);
    this.searchDataService.object$.subscribe(res => this.object = res);

    this.listeReservations = this.reservationsToCheck.filter(resa => resa.conflit == false && resa.workingDay == true);

    for (const reservation of this.listeReservations) {
      Object.assign(reservation, { object: this.object });
      Object.assign(reservation, { user_id: this.user.userId });
      Object.assign(reservation, { state: "1" });
    }

    const listeReservationsWithConflit = this.reservationsToCheck.filter(resa => resa.conflit == true || resa.workingDay == false);

    const confirmationReservationRecurrenceDialogConfig = new MatDialogConfig();
    confirmationReservationRecurrenceDialogConfig.data = {
      labelRecurrence: this.labelRecurrence,
      startDateRecurrence: this.startDateRecurrence,
      endDateRecurrence: this.endDateRecurrence,
      listeReservations: this.listeReservations,
      listeReservationsWithConflit: listeReservationsWithConflit
    };
    this.dialog.open(ConfirmationReservationRecurrenceComponent, confirmationReservationRecurrenceDialogConfig);
  }

}
