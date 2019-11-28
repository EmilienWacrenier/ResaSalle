import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { ToastrService, ToastRef } from 'ngx-toastr';
import { ApiConstants } from '../constantes/constantes';
import { Booking } from '../classes/booking';
import { Room } from '../classes/room';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ReservationService {

  protected user;

  constructor(private httpClient: HttpClient, private cst: ApiConstants, private toastr: ToastrService) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

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
    const params = new HttpParams().set('userId', this.user.userId);
    return this.httpClient
      .get<Booking[]>(this.cst.apiUrl + 'reservation/reservationsByUserId', {params: params});
      /*.subscribe(
        (response) => {
          var a = response['result'];
          console.log(a);
          bookings = a;
        },
        (error) => {
          console.log('Erreur ! : ' + error.error['result']);
        }
      );*/
      return bookings;
  }

  getReservationsOfThisWeek(room_id: number, startDate, endDate) {

    let roomId: string = room_id.toString();

    const params = new HttpParams()
      .set('roomId', roomId)
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.httpClient
      .get<Booking[]>(
        this.cst.apiUrl + 'reservation/reservationsByRoomId/',
        { params: params });
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
