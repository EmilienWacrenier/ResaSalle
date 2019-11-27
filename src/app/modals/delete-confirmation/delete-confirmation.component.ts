import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit {

  title: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDeleteModel) {
    this.title = data.title;
    this.message = data.message;
  }


  ngOnInit() { }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

export class ConfirmDeleteModel {
  constructor(public title: string, public message: string) { }
}
