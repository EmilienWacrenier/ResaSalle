import { Injectable } from '@angular/core';

import { Booking } from '../classes/booking';
import { ApiConstants } from '../constantes/constantes';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ReservationService {

  dashboardDataSource = [];
  protected user;

  constructor(private httpClient: HttpClient, private cst: ApiConstants) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  createReservation(reservation): Observable<string> {
    return this.httpClient
      .post<string>(this.cst.apiUrl + 'reservation/createSimpleReservation', reservation)
      .pipe(
        catchError(this.handleError)
      );
  }

  createReservationRecurrence(reservation): Observable<string> {
    return this.httpClient
      .post<string>(this.cst.apiUrl + 'reservation/createReservation', reservation)
      .pipe(
        catchError(this.handleError)
      );
  }

  checkReservationRecurrence(reservationToCheck): Observable<Booking[]> {
    const params = new HttpParams()
      .set('startDate', reservationToCheck.startDate)
      .set('endDate', reservationToCheck.endDate)
      .set('roomId', reservationToCheck.roomId.toString())
      .set('labelRecurrence', reservationToCheck.labelRecurrence)
      .set('endDateRecurrence', reservationToCheck.endDateRecurrence);


    return this.httpClient
      .get<Booking[]>(
        this.cst.apiUrl + 'reservation/checkRecurrence/',
        { params: params })
      .pipe(
        catchError(this.handleError)
      );
  }


  getReservationsFromUserConnected(): Observable<Booking[]> {
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
        this.cst.apiUrl + 'reservation/reservationsByRoomIdByDate/',
        { params: params });
  }

  getCheckReservation(roomId, startDate, endDate): Observable<Booking> {
    // let roomId: string = roomId.toString();

    const params = new HttpParams()
      .set('roomId', roomId)
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.httpClient
      .get<Booking>(
        this.cst.apiUrl + 'reservation/checkReservation/',
        { params: params });
  }

  getCheckRecurrence(reservationRecurrenceParameters): Observable<any>{
    const params = new HttpParams()
      .set('roomId', reservationRecurrenceParameters.roomId)
      .set('startDate', reservationRecurrenceParameters.startDate)
      .set('endDate', reservationRecurrenceParameters.endDate)
      .set('labelRecurrence', reservationRecurrenceParameters.labelRecurrence)
      .set('endDateRecurrence', reservationRecurrenceParameters.endDateRecurrence);

      console.log('Voici les params reçus :');
      console.log(params);
      
      return this.httpClient
        .get<Booking[]>(this.cst.apiUrl + 'reservation/checkRecurrence/', { params: params});
  }

  // Error handling
  handleError(error: HttpErrorResponse) {
    return throwError(error.error["result"]);
  }

}
