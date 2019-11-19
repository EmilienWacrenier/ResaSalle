import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { Booking } from 'src/app/classes/booking';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private reservationService: ReservationService) { }
  reservations$: Observable<Booking[]>;
  ngOnInit() {
    this.reservations$ = this.reservationService.getReservationsFromUserConnected();
  }

  /*getReservationsbyUser(): Observable<Booking[]> {
    this.reservationService.getReservationsFromUserConnected();
  }*/

}
