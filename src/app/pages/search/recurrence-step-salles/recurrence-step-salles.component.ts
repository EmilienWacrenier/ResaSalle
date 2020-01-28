import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/classes/room';
import { Subscription } from 'rxjs';
import { SearchDataServiceService } from 'src/app/services/search-data-service.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { User } from 'src/app/classes/user';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-recurrence-step-salles',
  templateUrl: './recurrence-step-salles.component.html',
  styleUrls: ['./recurrence-step-salles.component.scss']
})
export class RecurrenceStepSallesComponent implements OnInit {

  @Input() user: User;
  @Input() recurrenceMode: boolean;
  @Input() loadRoomsEvent: any;


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
  endDateRecurrence: Date;

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

    console.log("On verifie la recurrence ?");

    if (this.recurrenceMode) {
      console.log("A ce moment je récupere la liste des salles avec RECU");

      this.searchDataService.recurrenceName$.subscribe(res => this.recurrenceName = res);
      this.searchDataService.endDateRecurrence$.subscribe(res => this.endDateRecurrence = res);
      this.getRooms();
    }
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
  }

  sendToVerification() {

    let reservationRecurrenceParameters = {
      startDate: this.fullStartDate,
      endDate: this.fullEndDate,
      object: this.object,
      userId: this.user.userId,
      roomId: this.selectedRoom.roomId,
      recurrenceLabel: this.recurrenceName,
      recurrenceEndDate: this.endDateRecurrence
    }
    console.log(reservationRecurrenceParameters);
  }

}
