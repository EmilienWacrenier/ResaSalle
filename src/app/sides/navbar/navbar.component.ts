import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService, ToastRef } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ApiConstants } from '../../constantes/constantes';
import {MatDialog} from '@angular/material/dialog';
import {LogoutConfirmationComponent} from '../../modals/logout-confirmation/logout-confirmation.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();

  protected user;

  constructor(private toastr: ToastrService, private router: Router, private cst: ApiConstants, public dialog: MatDialog) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    //console.log('utilisateur connecté : ' + this.user.firsName);
  }

  logout() {
    this.toastr.success('Vous êtes déconnecté.', this.cst.toastrTitle + ' - Deconnexion', this.cst.toastrOptions);
    this.router.navigate(['/login']);
    localStorage.clear();
  }

  logoutConfirm() {
    const dialogRef = this.dialog.open(LogoutConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log(`Déconnexion...`);
        this.logout();
      }

    });
  }
}
