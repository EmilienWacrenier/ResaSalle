import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Room } from '../classes/room';

import { Booking } from '../classes/booking';
import * as moment from 'moment';
import { ToastrService, ToastRef } from 'ngx-toastr';
import { ApiConstants } from '../constantes/constantes';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  apiURL = 'localhost:3000/'
  constructor(private httpClient: HttpClient, private cst: ApiConstants, private toastr: ToastrService) { }

  getRooms(): Observable<Room[]> {
    
    const param = new HttpParams().set('startDate', moment().format('YYYY-MM-DD'));
    return this.httpClient
      .get<Room[]>(this.cst.apiUrl + 'reservation/reservationsByDay', { params: param }).pipe(
        map(
          (response)=> response['result']
          )
      );
    //return this.http.get<Room[]>(this.apiURL + 'salles/sallesReserveesEntre')
  }

  /*getRoomPlanning(id: number): Observable<Room> {
    return of(ROOMS.find(room => room.id === id));
  }*/
}
