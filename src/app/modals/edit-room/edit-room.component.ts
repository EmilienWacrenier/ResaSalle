import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { RoomService } from 'src/app/services/room.service';
import { ToastrService } from 'ngx-toastr';
import { ApiConstants } from 'src/app/constantes/constantes';
import { Room } from 'src/app/classes/room';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.scss']
})
export class EditRoomComponent implements OnInit {

  roomName: String;
  roomArea: String;
  roomCapacity: number;

  updateRoomForm: FormGroup;
  selectedArea: string;
  areas: string[] = ['A', 'B', 'C', 'D'];

  public updatedRoomCapacity: number = 2;

  constructor(public dialogRef: MatDialogRef<EditRoomComponent>,
    private roomService: RoomService,
    private toastr: ToastrService,
    private cst: ApiConstants,
    @Inject(MAT_DIALOG_DATA) public data: EditRoomModel) {
    this.roomName = data.roomToUpdate.name;
    this.roomArea = data.roomToUpdate.area;
    this.roomCapacity = data.roomToUpdate.capacity;

    this.updateRoomForm = new FormGroup({
      roomName: new FormControl('', [Validators.required]),
      roomArea: new FormControl('', [Validators.required])
    });
  }


  ngOnInit() {
    this.updateRoomForm.controls.roomName.setValue(this.roomName);
    this.updateRoomForm.controls.roomArea.setValue(this.roomArea);
    this.updatedRoomCapacity = this.roomCapacity;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  editRoom() {
    const body = {
      name: this.updateRoomForm.controls.roomName.value,
      capacity: this.updatedRoomCapacity,
      area: this.updateRoomForm.controls.roomArea.value,
      roomId: this.data.roomToUpdate.roomId
    }
    this.roomService.updateRoom(body).subscribe(
      (response) => {
        this.toastr.success(`Salle ${body.name} modifiée !`, this.cst.toastrTitle, this.cst.toastrOptions);
        this.dialogRef.close();
      },
      (error) => {
        this.toastr.error(error.error['result'], this.cst.toastrTitle, this.cst.toastrOptions);
      }
    )
  }

  incrementCapacity() {
    if (this.updatedRoomCapacity < 10)
      this.updatedRoomCapacity++;
  }

  decrementCapacity() {
    if (this.updatedRoomCapacity > 2)
      this.updatedRoomCapacity--;
  }

  checkRoomCapacityValue() {
    if (isNaN(this.updatedRoomCapacity)) {
      this.updatedRoomCapacity = 2;
    }
    if (this.updatedRoomCapacity >= 10) {
      this.updatedRoomCapacity = 10;
    }
    else if (this.updatedRoomCapacity <= 0) {
      this.updatedRoomCapacity = null;
    }
  }
}

export class EditRoomModel {
  constructor(public roomToUpdate: Room) { }
}
