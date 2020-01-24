import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/classes/room';

@Component({
  selector: 'app-salles-sans-recurrence',
  templateUrl: './salles-sans-recurrence.component.html',
  styleUrls: ['./salles-sans-recurrence.component.scss']
})
export class SallesSansRecurrenceComponent implements OnInit {

  //variables de capacité
  roomRequiredCapacity: number = 6;

  //liste des salles (reponse)
  roomList = [];

  //variable salle
  selectedRoom: Room;


  constructor(
    private roomService: RoomService
  ) { }

  ngOnInit() {
  }

  onChangeCapacity() {
    this.selectedRoom = null;
    this.roomList = [];
    //this.getRoomsAvailable(this.roomRequiredCapacity, this.startDateWithHours, this.endDateWithHours);
    }

    getRoomsAvailable(capacity, startDate, endDate) {

      this.roomService
        .getAvailableRooms(capacity, startDate, endDate)
        .subscribe(data => {
          this.roomList = data['result'];
          console.log(this.roomList)
        })
    }

}
