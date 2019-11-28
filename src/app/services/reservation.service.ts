import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ToastrService, ToastRef } from 'ngx-toastr';
import { ApiConstants } from '../constantes/constantes';
import { Booking } from '../classes/booking';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ReservationService {

  dashboardDataSource = [];

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


  getReservationsFromUserConnected(): Observable<Booking[]>{
    let bookings;
    this.dashboardDataSource.splice(0);
    const params = new HttpParams().set('userId', this.user.userId);
    return this.httpClient
      .get<Booking[]>(this.cst.apiUrl + 'reservation/reservationsByUserId', { params: params });
  }

  removeReservation(reservationId): Observable<any> {
    const param = new HttpParams().set('reservationId', reservationId);
    /*this.httpClient.delete(this.cst.apiUrl + 'reservation/deleteReservation', { params: param })
      .subscribe(
        (response) => {
          var a = response['result'];
          console.log('Result de remove :');
          console.log(a);
          this.toastr.success('Réservation supprimée !', this.cst.toastrTitle, this.cst.toastrOptions);
          
        },
        (error) => {
          console.log('Erreur Suppression ! : ' + error.error['result']);
          this.toastr.error(error.error['result'], this.cst.toastrTitle, this.cst.toastrOptions);
        }
      );*/
      return this.httpClient.delete(this.cst.apiUrl + 'reservation/deleteReservation', { params: param });
      
  }

 /* getDashboardDataSource() {
    this.dashboardDataSource.splice(0);
    this.getReservationsFromUserConnected()
      .subscribe(
        (response) => {
          this.dashboardDataSource.push(response['result']);
        }
      );
  }*/

  getReservationsOfThisWeek(reservation) {
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
