import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  createRoomForm: FormGroup;
  //roomArea: FormControl;
  selectedArea: string;
  areas : string [] = ['A', 'B', 'C', 'D'];
  constructor() {
    this.createRoomForm = new FormGroup({
      roomName: new FormControl('', [Validators.required]),
      roomArea: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
  }

  createRoom() { }
}
