import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../classes/booking';

@Injectable({
  providedIn: 'root'
})

export class ReservationService {

  reservation: Booking;

  constructor(private httpClient: HttpClient) { }

  saveUser() {
    this.httpClient
        .post<any[]>('http://localhost:3000/reservation/createReservation', this.reservation)
        .subscribe(
            (response) => {
                var a = response['result'];
                console.log(a);
            },
            (error) => {
                console.log('Erreur ! : ' + error.error['result']);
            }
        );
}

  
}
