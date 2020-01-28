import { Component, OnInit, Input } from '@angular/core';
import { Room } from 'src/app/classes/room';
import { RoomService } from 'src/app/services/room.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { SearchDataServiceService } from 'src/app/services/search-data-service.service';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-salles-avec-recurrence',
  templateUrl: './salles-avec-recurrence.component.html',
  styleUrls: ['./salles-avec-recurrence.component.scss']
})
export class SallesAvecRecurrenceComponent implements OnInit {

  @Input() user: User;

  //variables de capacité
  roomRequiredCapacity: number = 6;

  //liste des salles (reponse)
  roomList = [];

  //variable salle
  selectedRoom: Room;

  fullStartDate: string;
  fullEndDate: string;
  object: string;

  recurrenceName: string;
  endDateRecurrence: Date;

  constructor(private roomService: RoomService,
    private reservationService: ReservationService,
    private searchDataService: SearchDataServiceService) { }

  ngOnInit() {
    this.searchDataService.fullStartDate$.subscribe(res => this.fullStartDate = res);
    this.searchDataService.fullEndDate$.subscribe(res => this.fullEndDate = res);
    this.searchDataService.object$.subscribe(res => this.object = res);

    this.searchDataService.recurrenceName$.subscribe(res => this.recurrenceName = res);
    this.searchDataService.endDateRecurrence$.subscribe(res => this.endDateRecurrence = res);

    this.getRooms();
  }

  onChangeCapacity() {
    this.selectedRoom = null;
    console.log("No more selected room");
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

    console.log("send to verif");
    console.log(reservationRecurrenceParameters);

    this.reservationService.checkReservationRecurrence(
      this.fullStartDate,
      this.fullEndDate,
      this.selectedRoom.roomId,
      this.recurrenceName,
      this.endDateRecurrence)
      .subscribe(
        (res) => {
          console.log(res);
          this.searchDataService.getlisteReservationCheckRecurrence(res);
        })
        , (error) => {
          console.log(error);
        }
  }
}
