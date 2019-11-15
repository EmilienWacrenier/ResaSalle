import { Component, OnInit } from '@angular/core';
import { ToastrService, ToastRef } from 'ngx-toastr';
import { Router } from '@angular/router'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
  }

  logout(){
    this.toastr.success('Vous êtes déconnecté.', "ResaSalles - Deconnexion");
    this.router.navigate(['/login']);
  }
}
