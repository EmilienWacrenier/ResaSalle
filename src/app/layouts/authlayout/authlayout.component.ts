import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-authlayout',
  templateUrl: './authlayout.component.html',
  styleUrls: ['./authlayout.component.scss']
})
export class AuthlayoutComponent implements OnInit {
   loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private authService: AuthService
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
  }

  register() {
    const body = {
      firstName: this.registerForm.controls.firstName.value,
      lastName: this.registerForm.controls.lastName.value,
      das: this.registerForm.controls.DAS.value,
      email: this.registerForm.controls.email.value,
      mdp: this.registerForm.controls.password.value
    };
    console.log(body);
    this.authService.createNewUser(body);
  }

  login() {
    const body = {
      email: this.loginForm.controls.email.value,
      mdp: this.loginForm.controls.password.value
    };
    console.log(body);
    this.authService.loginUser(body);
  }

}