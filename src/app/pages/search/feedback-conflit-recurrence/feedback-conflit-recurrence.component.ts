import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { Booking } from 'src/app/classes/booking';
import { RoomService } from 'src/app/services/room.service';
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

  //reservation a afficher dans planning
  reservation: any
  indexReservation: number;

  //reponse avec la liste des reservations de la recurrence avec et sans conflit
  reservationsToCheck: any;

  planningClicked: boolean = false;

  labelRecurrence: string;
  startDateRecurrence: string;
  endDateRecurrence: string;

  listeReservations: [];

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
        console.log(error);
      }
    )
  }

  //STEP FINAL
  deleteBooking(booking) {
    console.log(booking);
  }

  //fonction quand on clique sur une resa avec un conflit
  displayPlanning(reservation: any, indexReservation: number) {
    this.planningClicked = true;
    this.reservation = reservation;
    this.indexReservation = indexReservation;
  }

  closePlanning() {
    this.planningClicked = false;
  }

  updateReservation(event) {
    let index = event.indexReservation;
    let newReservation = event.reservation;

    this.reservationsToCheck[index] = newReservation;

    console.log(this.reservationsToCheck);
    this.planningClicked = false;

    this.reservationService.getCheckReservation(newReservation.roomId, newReservation.startDate, newReservation.endDate)
      .subscribe(res => {
        console.log(res);
        let reservationIsGood = res['result'];
        if (reservationIsGood.isConflict == false) {
          newReservation.conflit = false;
        }
      })
  }

  openReservationSimpleConfirmationModal() {
    this.searchDataService.recurrenceName$.subscribe(res => this.labelRecurrence = res);
    this.searchDataService.fullStartDate$.subscribe(res => this.startDateRecurrence = res);
    this.searchDataService.endDateRecurrence$.subscribe(res => this.endDateRecurrence = res);

    this.listeReservations = this.reservationsToCheck.filter(resa => resa.conflit == false && resa.workingDay == true);

    for (const reservation of this.listeReservations) {
      Object.assign(reservation, { user_id: this.user.userId });
    }
    console.log(this.listeReservations);

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
