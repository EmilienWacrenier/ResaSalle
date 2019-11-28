import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Room } from '../classes/room';
import { ROOMS } from '../mock-roomList';
import { Booking } from '../classes/booking';
import { ApiConstants } from '../constantes/constantes';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  apiURL = 'localhost:3000/';
  constructor(private httpClient : HttpClient, private cst: ApiConstants) { }

  getRooms(): Observable<Room[]> {
    return of(ROOMS);
    //return this.http.get<Room[]>(this.apiURL + 'salles/sallesReserveesEntre')
  }

  getRoomPlanning(id: number): Observable<Room> {
    return of(ROOMS.find(room => room.id === id));
  }

  getSallebyId(salleId): Observable<Room> {
    const params = new HttpParams()
      .set("salleId", salleId)
      console.log(params);

    let res = this.httpClient
    .get<Room>(this.cst.apiUrl + 'salle/salleById', {params:params})
    .pipe(
      catchError(this.errorMgmt));

    console.log(res);

    return res;

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