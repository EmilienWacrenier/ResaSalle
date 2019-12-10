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

  dashboardDataSource = [];
  protected user;

  constructor(private httpClient: HttpClient, private cst: ApiConstants, private toastr: ToastrService) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  createReservation(reservation):Observable<string>{
    return this.httpClient
      .post<string>(this.cst.apiUrl + 'reservation/createReservation', reservation)
      .pipe(
        map((data: any) => {
          console.log(data);
          return data;
        }), catchError( error => {
          return error;
        })
      )
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
