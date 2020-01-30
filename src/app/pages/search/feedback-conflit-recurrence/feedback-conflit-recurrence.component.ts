import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Booking } from 'src/app/classes/booking';
import { RoomService } from 'src/app/services/room.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { SearchDataServiceService } from 'src/app/services/search-data-service.service';

@Component({
  selector: 'app-feedback-conflit-recurrence',
  templateUrl: './feedback-conflit-recurrence.component.html',
  styleUrls: ['./feedback-conflit-recurrence.component.scss']
})
export class FeedbackConflitRecurrenceComponent implements OnInit {

  //variable pour le planning
  listeReservation: Booking[];
  weekDays: any[];
  bookingsOfTheWeek: any;

  //reservation a afficher dans planning
  reservation: any
  indexReservation: number;

  //reponse avec la liste des reservations de la recurrence avec et sans conflit
  reservationsToCheck: any;

  planningClicked: boolean = false;

  constructor(private roomService: RoomService,
    private reservationService: ReservationService,
    private searchDataService: SearchDataServiceService) { }

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
  displayPlanning(reservation: any, indexReservation : number){
    this.planningClicked = true;
    this.reservation = reservation;
    this.indexReservation = indexReservation;
}

  closePlanning(){
    this.planningClicked = false;
  }
  
  updateReservation(event){
    let index = event.indexReservation;
    let newReservation = event.reservation;

    console.log(index + newReservation);

    this.reservationsToCheck[index] = newReservation;

    console.log(this.reservationsToCheck);
    this.planningClicked = false;
    //check reservation si ok ou pas (voir route)
  }

}
