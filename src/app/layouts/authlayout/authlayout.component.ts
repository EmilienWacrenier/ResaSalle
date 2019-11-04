import { Component, OnInit } from '@angular/core';

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

  constructor(/*private loginService: LoginService, private router: Router, private fb: FormBuilder, private RegisterService: RegisterService*/) { }
  ngOnInit() {
    this.createForm();
  }

  login() {
    // console.log('user', this.user);
    /*this.loginService
      .setLogin(this.user)
      .subscribe(data => this.handleSuccess(data), error => this.handleError(error))*/
      console.log("logged");
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
  createForm() {
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
