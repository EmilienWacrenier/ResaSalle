import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-logout-confirmation',
  templateUrl: './logout-confirmation.component.html',
  styleUrls: ['./logout-confirmation.component.scss']
})
export class LogoutConfirmationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LogoutConfirmationComponent>) { }

  ngOnInit() {
  }

  quit(){
    this.dialogRef.close();
  }
}
