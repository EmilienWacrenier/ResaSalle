import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Room } from '../classes/room';
import { ROOMS } from '../mock-roomList';
import { Booking } from '../classes/booking';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  apiURL = 'localhost:3000/'
  constructor() { }

  getRooms(): Observable<Room[]> {
    return of(ROOMS);
    //return this.http.get<Room[]>(this.apiURL + 'salles/sallesReserveesEntre')
  }

  getRoomPlanning(id: number): Observable<Room> {
    return of(ROOMS.find(room => room.id === id));
  }
}
