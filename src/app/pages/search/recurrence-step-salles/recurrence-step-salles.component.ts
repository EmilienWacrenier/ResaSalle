import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/classes/room';
import { Subscription } from 'rxjs';
import { SearchDataServiceService } from 'src/app/services/search-data-service.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { User } from 'src/app/classes/user';
import { ConfirmationReservation, ConfirmationReservationComponent } from 'src/app/modals/confirmation-reservation/confirmation-reservation.component';
import * as moment from 'moment';


@Component({
  selector: 'app-recurrence-step-salles',
  templateUrl: './recurrence-step-salles.component.html',
  styleUrls: ['./recurrence-step-salles.component.scss']
})
export class RecurrenceStepSallesComponent implements OnInit {

  @Input() user: User;
  @Input() recurrenceMode: boolean;
  @Input() loadRoomsEvent: any;
  @Output() onValidationRecurrenceEvent = new EventEmitter<any>();


  dataSearchSubscription: Subscription;

  //variables de capacité
  roomRequiredCapacity: number;

  //liste des salles (reponse)
  roomList = [];

  //variable salle
  selectedRoom: Room;

  fullStartDate: string;
  fullEndDate: string;
  object: string;

  recurrenceName: string;
  endDateRecurrence: string;

  constructor(
    private roomService: RoomService,
    private reservationService: ReservationService,
    private searchDataService: SearchDataServiceService
  ) {
  }

  ngOnInit() {
    this.roomRequiredCapacity = 6;
    this.searchDataService.fullStartDate$.subscribe(res => this.fullStartDate = res);
    this.searchDataService.fullEndDate$.subscribe(res => this.fullEndDate = res);
    this.searchDataService.object$.subscribe(res => this.object = res);
  }

  onChangeCapacity() {
    this.selectedRoom = null;
    if (!this.recurrenceMode) {
      this.getRoomsAvailable(this.roomRequiredCapacity, this.fullStartDate, this.fullEndDate);
    }
  }

  // Sélectionne une salle pour l'étape suivante, modifie les styles css sur la bonne card
  onSelectRoom(room) {
    if (room !== this.selectedRoom) {
      this.selectedRoom = room;
    }
  }

  getRooms() {
    this.roomService.getRooms()
      .subscribe(data => {
        this.roomList = data['result'];
        console.log(this.roomList)
      })
  }

  getRoomsAvailable(capacity, startDate, endDate) {

    this.roomService
      .getAvailableRooms(capacity, startDate, endDate)
      .subscribe(data => {
        this.roomList = data['result'];
        console.log(this.roomList)
      });
  }

  getAvailableRoomsFromEmitter() {
    this.roomService
      .getAvailableRooms(this.roomRequiredCapacity, this.fullStartDate, this.fullEndDate)
      .subscribe(data => {
        this.roomList = data['result'];
        console.log(this.roomList)
      });
  }

  getRoomsAndRecurrenceParams() {
    this.searchDataService.recurrenceName$.subscribe(res => this.recurrenceName = res);
    this.searchDataService.endDateRecurrence$.subscribe(res => this.endDateRecurrence = res);
    this.getRooms();
  }
  createReservation() {
    let reservation = {
      startDate: this.fullStartDate,
      endDate: this.fullEndDate,
      object: this.object,
      userId: this.user.userId,
      roomId: this.selectedRoom.roomId
    }
    console.log(reservation);
    //this.reservationService.createReservation(reservation);
    /*const message =`Souhaitez-vous vraiment réserver la salle` ;
      const dialogData = new ConfirmationReservation(
        `Confirmer votre réservation`, 
        message, 
        this.selectedRoom.name, 
        this.fullStartDate =moment(this.fullStartDate).locale("fr").format('dddd Do MMMM YYYY [de] H[h]mm'),
        this.fullEndDate =moment(this.fullEndDate).format('[ à] H[h]mm'),
        this.object
        );
      const dialogRef = this.dialog.open(ConfirmationReservationComponent, {
        width: '400px',
        data: dialogData
      });*/
  }

  sendToVerification() {

    let checkReservationRecurrence = {
      startDate: this.fullStartDate,
      endDate: this.fullEndDate,
      roomId: this.selectedRoom.roomId,
      labelRecurrence: this.recurrenceName,
      endDateRecurrence: this.endDateRecurrence,
      object: this.object,
      userId: this.user.userId
    }
    console.log(checkReservationRecurrence);

    this.reservationService.checkReservationRecurrence(checkReservationRecurrence).subscribe(
      (res) => {
        console.log(res);
        this.searchDataService.getlisteReservationCheckRecurrence(res);
      }
    )
    //this.onValidationRecurrenceEvent.emit(checkReservationRecurrence);
    //this.reservationService.getCheckRecurrence(reservationRecurrenceParameters);
  }

}
