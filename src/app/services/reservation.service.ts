import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ToastrService, ToastRef } from 'ngx-toastr';
import { ApiConstants } from '../constantes/constantes';

@Injectable({
  providedIn: 'root'
})

export class ReservationService {

  constructor(private httpClient: HttpClient, private cst: ApiConstants, private toastr: ToastrService) { }

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


}
