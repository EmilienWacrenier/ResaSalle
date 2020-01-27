import { Component, OnInit, Input } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/classes/room';
import { Subscription } from 'rxjs';
import { SearchDataServiceService } from 'src/app/services/search-data-service.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-salles-sans-recurrence',
  templateUrl: './salles-sans-recurrence.component.html',
  styleUrls: ['./salles-sans-recurrence.component.scss']
})
export class SallesSansRecurrenceComponent implements OnInit {

  @Input() user : User;

  dataSearchSubscription : Subscription;

  //variables de capacité
  roomRequiredCapacity: number = 6;

  //liste des salles (reponse)
  roomList = [];

  //variable salle
  selectedRoom: Room;

  fullStartDate : string;
  fullEndDate: string;
  object:string;

  constructor(
    private roomService: RoomService,
    private reservationService : ReservationService,
    private searchDataService : SearchDataServiceService
  ) {
  }

  ngOnInit() {
    this.searchDataService.fullStartDate$.subscribe(res => this.fullStartDate = res);
    this.searchDataService.fullEndDate$.subscribe(res => this.fullEndDate = res);
    this.searchDataService.object$.subscribe(res => this.object = res);
    this.getRoomsAvailable(this.roomRequiredCapacity, this.fullStartDate, this.fullEndDate);
  }

  onChangeCapacity() {
    this.selectedRoom = null;
    this.roomList = [];
    this.getRoomsAvailable(this.roomRequiredCapacity, this.fullStartDate, this.fullEndDate);
    }

    // Sélectionne une salle pour l'étape suivante, modifie les styles css sur la bonne card
  onSelectRoom(room) {
    if (room !== this.selectedRoom) {
      this.selectedRoom = room;
    }
  }

    getRoomsAvailable(capacity, startDate, endDate) {

      this.roomService
        .getAvailableRooms(capacity, startDate, endDate)
        .subscribe(data => {
          this.roomList = data['result'];
          console.log(this.roomList)
        })
    }

    createReservation(){
      let reservation = {
        startDate : this.fullStartDate,
        endDate : this.fullEndDate,
        object : this.object,
        userId : this.user.userId,
        roomId: this.selectedRoom.roomId
      }
      console.log(reservation);
      //this.reservationService.createReservation(reservation);
    }

}
