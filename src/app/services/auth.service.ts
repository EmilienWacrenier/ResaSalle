import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ToastrService, ToastRef } from 'ngx-toastr';
import { ApiConstants } from '../constantes/constantes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private cst: ApiConstants,
    private toastr: ToastrService,
    private router: Router,
    ) { }

  createNewUser(body){
    this.httpClient.post(this.cst.apiUrl + 'user/register', body).subscribe(
      (response) => {

        //localStorage.setItem('token', login);
        console.log(response['result']);
        this.toastr.success('Utilisateur créé !', this.cst.toastrTitle);
        //this.router.navigate(['']);

      },
      (err) => {
        this.toastr.error(err.error['result'], this.cst.toastrTitle, this.cst.toastrOptions);
      }
    );
  }

  loginUser(params){
    this.httpClient.get(this.cst.apiUrl + 'user/login', {params : params}).subscribe(
      (response) => {

        console.log(response['result']);
        //localStorage.setItem('token', login);

        localStorage.setItem('user', JSON.stringify(response['result']));
        this.toastr.success('Vous êtes connecté !', this.cst.toastrTitle, this.cst.toastrOptions);
        console.log('Connexion réussie');
        this.router.navigate(['']);

      },
      (err) => {
        this.toastr.error(err.error['result'], this.cst.toastrTitle, this.cst.toastrOptions);
        console.log('Connexion échouée');
      }
    );
  }
}
