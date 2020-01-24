import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/classes/room';

@Component({
  selector: 'app-salles-avec-recurrence',
  templateUrl: './salles-avec-recurrence.component.html',
  styleUrls: ['./salles-avec-recurrence.component.scss']
})
export class SallesAvecRecurrenceComponent implements OnInit {

   //variables de capacité
   roomRequiredCapacity: number = 6;

   //liste des salles (reponse)
  roomList = [];

  //variable salle
  selectedRoom: Room;
  roomService: any;

  constructor() { }

  ngOnInit() {
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
    this.roomService
      .getRooms()
      .subscribe(data => {
        this.roomList = data['result'];
        console.log(this.roomList)
      })
  }

  
  /*
  sendToVerification() {
    console.log('Réservation : ');
    console.log(this.selectedRoom);
    console.log(this.selectedObjet);
    console.log(this.startDateWithHours);
    console.log(this.endDateWithHours);
    console.log(this.selectedRecurrence);
    console.log(this.selectedEndDateRecurrence);
    
    this.dsBooking = new MatTableDataSource<Booking>();
    
    let bookingBuilt = {
      startDate: this.startDateWithHours,
      endDate: this.endDateWithHours,
      object: this.selectedObjet,
      roomId: this.selectedRoom.roomId,
      userId: this.currentUser.userId,
      recurrenceLabel : this.selectedRecurrence,
      recurrenceEndDate : this.selectedEndDateRecurrence
    }
    console.log("send to verif")
  }
*/




}
