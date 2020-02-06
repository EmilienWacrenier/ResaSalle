import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { ReservationService } from 'src/app/services/reservation.service';
import { SearchDataServiceService } from 'src/app/services/search-data-service.service';
import { ConfirmationReservationRecurrenceComponent } from 'src/app/modals/confirmation-reservation-recurrence/confirmation-reservation-recurrence.component';
import { User } from 'src/app/classes/user';
import * as moment from 'moment';
import { Room } from 'src/app/classes/room';

@Component({
  selector: 'app-feedback-conflit-recurrence',
  templateUrl: './feedback-conflit-recurrence.component.html',
  styleUrls: ['./feedback-conflit-recurrence.component.scss']
})
export class FeedbackConflitRecurrenceComponent implements OnInit {

  @Input() user: User;
  //reponse avec la liste des reservations de la recurrence avec et sans conflit
  reservationsToCheck = [];
  listeReservations = [];

  modifiedReservationsList = [];

  object: string;
  labelRecurrence: string;
  startDateRecurrence: string;
  endDateRecurrence: string;
  room: Room;
  startDate: string;
  endDate: string;
  conflictCount: number = 0;

  planningLoadTrue: boolean = false;

  constructor(
    private reservationService: ReservationService,
    private searchDataService: SearchDataServiceService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) {
    this.searchDataService.fullStartDate$.subscribe(res => this.startDate = res);
    this.searchDataService.fullEndDate$.subscribe(res => this.endDate = res);
    this.searchDataService.room$.subscribe(res => this.room = res);

    this.searchDataService.object$.subscribe(res => this.object = res);

    this.searchDataService.recurrenceName$.subscribe(res => this.labelRecurrence = res);
    this.searchDataService.endDateRecurrence$.subscribe(res => this.endDateRecurrence = res);
  }

  ngOnInit() {
    console.log(this.room);
    this.searchDataService.listeReservationCheckRecurrence$.subscribe(
      (res) => {
        this.reservationsToCheck = res['result'];
        if (this.reservationsToCheck) {
          console.log(this.reservationsToCheck);
          this.conflictCount = this.countResaConflict(this.reservationsToCheck);
        }
      }, (error) => {
      }
    )
  }

  showPlanning(): void{
    this.planningLoadTrue = true;
  }

  deleteDate(index: number) {
    this.reservationsToCheck.splice(index, 1);
  }

  updateReservation(event) {
    const index = event.indexReservation;
    let newReservation = event.reservation;

    const newReservationIsConflict: boolean = this.checkReservations(newReservation, this.reservationsToCheck);
    console.log(newReservationIsConflict);

    if (newReservationIsConflict == true) {
      this.snackBar.open('Cette date est déjà présente dans la liste', '', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
      console.log("UR newResa ne doit pas etre ajoutée");
    }
    else {
      this.reservationService.getCheckReservation(newReservation.roomId, newReservation.startDate, newReservation.endDate)
        .subscribe(res => {
          this.reservationsToCheck[index] = res['result'];
        });
    }
    this.conflictCount = this.countResaConflict(this.reservationsToCheck);
  }

  countResaConflict(reservationList: Array<any>): number {
    let count = reservationList.filter(reservation => reservation.conflit == true || reservation.workingDay == false).length;
    return count;
  }

  checkReservations(newReservation: any, reservationList: Array<any>) {

    for (const reservation of reservationList) {
      console.log(newReservation);
      console.log(reservation);
      if (
        reservation.roomId == newReservation.roomId &&
        moment(newReservation.startDate).isAfter(reservation.startDate) && moment(newReservation.endDate).isSameOrBefore(reservation.endDate)
        || moment(newReservation.startDate).isSameOrAfter(reservation.startDate) && moment(newReservation.startDate).isBefore(reservation.endDate)
        || moment(newReservation.startDate).isSameOrBefore(reservation.startDate) && moment(newReservation.endDate).isSameOrAfter(reservation.endDate)
      ) {
        return true;
      }
      else {
        return false;
      }
    }
  }

  openReservationSimpleConfirmationModal() {
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
      startDateRecurrence: this.startDate,
      endDateRecurrence: this.endDateRecurrence,
      listeReservations: this.listeReservations,
      listeReservationsWithConflit: listeReservationsWithConflit
    };
    this.dialog.open(ConfirmationReservationRecurrenceComponent, confirmationReservationRecurrenceDialogConfig);
  }

}
