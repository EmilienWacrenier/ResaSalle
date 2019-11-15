import { Component, OnInit } from '@angular/core';
import { ToastrService, ToastRef } from 'ngx-toastr';
import { Router } from '@angular/router'
import { ApiConstants } from '../../constantes/constantes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private toastr: ToastrService, private router: Router, private cst: ApiConstants) { }

  ngOnInit() {
  }

  logout(){
    this.toastr.success('Vous êtes déconnecté.', this.cst.toastrTitle +" - Deconnexion", this.cst.toastrOptions);
    this.router.navigate(['/login']);
  }
}
