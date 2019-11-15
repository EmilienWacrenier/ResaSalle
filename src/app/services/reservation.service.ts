import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class ReservationService {

  constructor(private httpClient: HttpClient) { }

  createReservation(reservation) {
    this.httpClient
        .post<any[]>('http://localhost:3000/reservation/createReservation', reservation)
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
