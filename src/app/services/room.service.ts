import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { ToastrService, ToastRef } from 'ngx-toastr';
import { ApiConstants } from '../constantes/constantes';
import { Booking } from '../classes/booking';
import { Room } from '../classes/room';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ObserveOnMessage } from 'rxjs/internal/operators/observeOn';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private httpClient: HttpClient, private cst: ApiConstants, private toastr: ToastrService) { }

  getRooms(): Observable<Room[]> {
    return this.httpClient.get<Room[]>(this.cst.apiUrl + 'salle/rooms');
  }

  getAvailableRooms(capacity, startDate, endDate): Observable<Room[]> {

    const params = new HttpParams()
      .set('capacity', capacity)
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.httpClient.get<Room[]>(this.cst.apiUrl + 'salle/availableRooms',
      { params: params });
  }

  createRoom(body): Observable<any> {
    return this.httpClient.post(this.cst.apiUrl + 'salle/createRoom', body);
  }

  deleteRoom(id): Observable<any> {
    const param = new HttpParams().set('roomId', id);
    return this.httpClient.delete(this.cst.apiUrl + 'salle/deleteRoom', { params: param });
  }

  updateRoom(body): Observable<any>{
    return this.httpClient.put(this.cst.apiUrl + 'salle/modifyRoom', body);
  }
}
