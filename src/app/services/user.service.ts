import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { ToastrService, ToastRef } from 'ngx-toastr';
import { ApiConstants } from '../constantes/constantes';
import { User } from '../classes/user';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private cst: ApiConstants, private toastr: ToastrService) { }

  getUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.cst.apiUrl + 'user/users');
  }

}