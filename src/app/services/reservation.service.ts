import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ToastrService, ToastRef } from 'ngx-toastr';
import { ApiConstants } from '../constantes/constantes';
import { Booking } from '../classes/booking';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ReservationService {

  constructor(private httpClient: HttpClient, private cst: ApiConstants, private toastr: ToastrService) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  protected user;
  createReservation(reservation) {
    this.httpClient
      .post<any[]>(this.cst.apiUrl + 'reservation/createReservation', reservation)
      .subscribe(
        (response) => {
          var a = response['result'];
          console.log(a);

          this.toastr.success('Réservation créée !', this.cst.toastrTitle, this.cst.toastrOptions);
        },
        (error) => {
          console.log('Erreur ! : ' + error.error['result']);
          this.toastr.error(error.error['result'], this.cst.toastrTitle, this.cst.toastrOptions);
        }
      );
  }


  getReservationsFromUserConnected(): Observable<Booking[]> {
    let bookings;
    this.httpClient
      .post<any[]>(this.cst.apiUrl + 'reservation/reservationsByUserId', {user_id: this.user.idUser})
      .subscribe(
        (response) => {
          var a = response['result'];
          console.log(a);
          bookings = a;
        },
        (error) => {
          console.log('Erreur ! : ' + error.error['result']);
        }
      );
      return bookings;
  }

  getReservationsOfThisWeek(reservation){
    this.httpClient
      .get<any[]>(this.cst.apiUrl + 'reservation/reservationsBySalleId', reservation)
      .subscribe(
        (response) => {
          var a = response['result'];
          console.log(a);

          this.toastr.success('success', this.cst.toastrTitle, this.cst.toastrOptions);
        },
        (error) => {
          console.log('Erreur ! : ' + error.error['result']);
          this.toastr.error(error.error['result'], this.cst.toastrTitle, this.cst.toastrOptions);
        }
      );
    
    
  }


}
