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

  //reservation a afficher dans planning
  reservation: any
  indexReservation: number;

  //reponse avec la liste des reservations de la recurrence avec et sans conflit
  reservationsToCheck: any;

  planningClicked: boolean = false;

  labelRecurrence: string;
  startDateRecurrence: string;
  endDateRecurrence: string;

  constructor(
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
    
    this.reservationService.getCheckReservation(newReservation.roomId, newReservation.startDate, newReservation.endDate)
    .subscribe( res => 
      {
        let reservationIsGood = res['result'];
        if (reservationIsGood){
          newReservation.conflit = false;
        }
        else newReservation.conflit = true;
      }
    )
  }

  createReservationRecurrence(){
    this.searchDataService.recurrenceName$.subscribe( res => this.labelRecurrence = res );
    this.searchDataService.fullStartDate$.subscribe( res => this.startDateRecurrence = res );
    this.searchDataService.endDateRecurrence$.subscribe( res => this.endDateRecurrence = res );

    const listeReservations = this.reservationsToCheck.filter( resa => resa.conflit == false && resa.isWorkingDay == true );
    console.log(listeReservations);

    const listeReservationsWithConflit = this.reservationsToCheck.filter( resa => resa.conflit == true );

    let confirmText = "Attention plusieurs créneaux ne sont pas disponibles et vont être ignorés. \r";

    if(listeReservationsWithConflit || listeReservationsWithConflit != null || listeReservationsWithConflit != undefined){

      for(const i in listeReservationsWithConflit){
        confirmText += "• Début : " + listeReservationsWithConflit[i].startDate + ", Fin : " + listeReservationsWithConflit[i].endDate + ", Salle : " + listeReservationsWithConflit[i].roomId + "\r";
      }

      confirmText += "Si vous êtes d'accord, cliquez sur OK, sinon sur Annuler";



      const res = window.confirm(confirmText)
      if(res){
        console.log("creation resa");
      }
    }
    
    const createReservationParameters = {
      labelRecurrence : this.labelRecurrence,
      startDateRecurrence : this.startDateRecurrence,
      endDateRecurrence : this.endDateRecurrence,
      listeReservation : listeReservations
    }



    //createResa


  }

}
