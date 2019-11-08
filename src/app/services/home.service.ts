import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Room } from '../classes/room';
import { ROOMS } from '../mock-roomList';
import { Booking } from '../classes/booking';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  getRooms(): Observable<Room[]> {
    return of(ROOMS);
  }

  getBookingsByRoom(id): Observable<Booking[]>{
    console.log("Room " + ROOMS[id].name + " : " + ROOMS[id].bookings)
    return of (ROOMS[id].bookings);
  }
}
