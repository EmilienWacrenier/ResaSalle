import { Component, OnInit } from '@angular/core';
import { ToastrService, ToastRef } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../../constantes/constantes';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-authlayout',
  templateUrl: './authlayout.component.html',
  styleUrls: ['./authlayout.component.scss']
})
export class AuthlayoutComponent implements OnInit {
  /*user: Login = { 
    nickname: '',
    email: '',
    password: ''
  };
  
    creationForm: FormGroup;

  */
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    /*private loginService: LoginService, private router: Router, private fb: FormBuilder, private RegisterService: RegisterService*/
    private cst: ApiConstants,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private jwt: JwtHelperService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.registerForm = new FormGroup({
      lastName: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      DAS: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
  ngOnInit() {
    this.createLoginForm();
  }

  register() {
    const body = {
      firstname: this.registerForm.controls.firstName.value,
      lastname: this.registerForm.controls.lastName.value,
      das: this.registerForm.controls.DAS.value,
      email: this.registerForm.controls.email.value,
      mdp: this.registerForm.controls.password.value
    };
    this.http.post(this.cst.apiUrl + 'user/register', body).subscribe(
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
  login() {
    // console.log('user', this.user);
    /*this.loginService
      .setLogin(this.user)
      .subscribe(data => this.handleSuccess(data), error => this.handleError(error))*/
    const loginBody = {
      email: this.loginForm.controls.email.value,
      mdp: this.loginForm.controls.password.value
    };
    this.http.post(this.cst.apiUrl + 'user/login', loginBody).subscribe(
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

  handleSuccess(data) {
    localStorage.setItem('token', data.token);
    console.log('connected: ', data);
    /*this.router.navigate(['/forum/all-topics']);*/
  }

  handleError(error) {
    console.error('Identifiant inccorrect', error);
  }

  // notre creation d'avatar avec le module forms
  createLoginForm() {
    /*
    this.creationForm = this.fb.group({
      nickname: '',
      email: '',
      password: '',
      confirm_password: ''
    });
    */

    console.log("form cree");
  }
  // notre submit
  createUser() {
    /*if(this.creationForm) {
      console.log(this.creationForm.value);
      this.RegisterService
      .setRegister(this.creationForm.value)
      .subscribe(data => this.handleSuccess(data), error => this.handleError(error));
    };*/
    console.log("user creee");
  };

  /*
  handleSuccess(data) {
    console.log('user created', data);
    this.router.navigate(['/signupSuccess']);
  }
 
  handleError(error) {
    console.error('KO user created', error);
  }*/

}
