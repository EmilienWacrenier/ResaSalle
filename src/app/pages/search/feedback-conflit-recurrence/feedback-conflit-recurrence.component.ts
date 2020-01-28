import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Booking } from 'src/app/classes/booking';
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

  dsBooking: MatTableDataSource<Booking>;
  displayedColumns: string[] = ['date', 'startDate', 'endDate', 'room'];

  //reservation a afficher dans planning
  reservation: Booking;

  //reponse avec la liste des reservations de la recurrence avec et sans conflit
  reservationFeedback: Booking[];

  constructor(
    private searchDataService : SearchDataServiceService
  ) { }

  ngOnInit() {
    this.searchDataService.listeReservationCheckRecurrence$.subscribe(
      res => {
        console.log(res);
        //this.reservationFeedback = res;
        
      }
      , (error) => {
        console.log(error);
      }
    )
  }

  //STEP FINAL
  deleteBooking(booking) {
    console.log(booking);

  }

  updateBookingsVerification() {
    this.dsBooking.data = null;
    /*this.reservationService.getCheckReservation().subscribe(
      (response) => {
        this.dsBooking.data = (response['result']);
      })*/
  }

  //fonction quand on clique sur une resa avec un conflit
  displayPlanning(reservation: Booking){
    this.reservation = reservation;
  }



}
