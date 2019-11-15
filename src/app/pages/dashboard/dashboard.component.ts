import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
    this.getReservationbyUser();
  }

  getReservationbyUser(){
    return this.reservationService.getReservationFromUserConnected();
  }

}
