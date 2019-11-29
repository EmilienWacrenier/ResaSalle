import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Room } from 'src/app/classes/room';
import { MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { DeleteConfirmationComponent, ConfirmDeleteModel } from '../../modals/delete-confirmation/delete-confirmation.component';

import { RoomService } from 'src/app/services/room.service';
import { ToastrService } from 'ngx-toastr';
import { ApiConstants } from 'src/app/constantes/constantes';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  createRoomForm: FormGroup;
  //roomArea: FormControl;
  selectedArea: string;
  areas: string[] = ['A', 'B', 'C', 'D'];

  dsRoom: MatTableDataSource<Room>;
  displayedColumns: string[] = ['room', 'area', 'capacity', 'actions'];
  public newRoomCapacity: number = 2;

  constructor(private roomService: RoomService, private toastr: ToastrService, private cst: ApiConstants, public dialog: MatDialog) {
    this.createRoomForm = new FormGroup({
      roomName: new FormControl('', [Validators.required]),
      roomArea: new FormControl('', [Validators.required])
    });
    this.dsRoom = new MatTableDataSource<Room>();
  }

  ngOnInit() {
    this.updateRooms();
  }

  createRoom() {
    if (this.newRoomCapacity < 2 || this.newRoomCapacity > 10 || isNaN(this.newRoomCapacity)) {
      console.log('Capacité incorrecte')
    } else {

      const body = {
        name: this.createRoomForm.controls.roomName.value,
        area: this.createRoomForm.controls.roomArea.value,
        capacity: this.newRoomCapacity
      }

      this.roomService.createRoom(body).subscribe(
        (response) => {
          this.toastr.success(`Salle ${body.name} créée !`, this.cst.toastrTitle, this.cst.toastrOptions);
          this.updateRooms();
        },
        (error) => {
          console.log('Erreur ! : ' + error.error['result']);
          this.toastr.error(error.error['result'], this.cst.toastrTitle, this.cst.toastrOptions);
        }
      );
    }
  }

  deleteRoom(room){
    const message = `Souhaitez-vous vraiment supprimer la salle ${room.name} ? \n La suppression entraînera l\'annulation de toutes les réservations associées`;

    const dialogData = new ConfirmDeleteModel(`Supprimer la salle ${room.name}`, message);

    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '400px',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        console.log(room.roomId);
        // DO SOMETHING
        this.roomService.deleteRoom(room.roomId).subscribe(
          (response) => {
            var a = response['result'];
            console.log('Result de remove :');
            console.log(a);
            this.toastr.success(`Salle ${room.name} supprimée !`, this.cst.toastrTitle, this.cst.toastrOptions);

            this.updateRooms();
          },
          (error) => {
            console.log('Erreur Suppression ! : ' + error.error['result']);
            this.toastr.error(error.error['result'], this.cst.toastrTitle, this.cst.toastrOptions);

            this.updateRooms();
          }
        );
      }
    });
  }

  updateRooms() {
    this.dsRoom.data = null;
    this.roomService.getRooms().subscribe(
      (response) => {
        this.dsRoom.data = (response['result']);
        console.log(this.dsRoom.data)
      })
  }
  editRoom(roomId) { }

  incrementCapacity() {
    if (this.newRoomCapacity < 10)
      this.newRoomCapacity++;
  }

  decrementCapacity() {
    if (this.newRoomCapacity > 2)
      this.newRoomCapacity--;
  }

  checkRoomCapacityValue() {
    if (isNaN(this.newRoomCapacity)) {
      this.newRoomCapacity = 2;
    }
    if (this.newRoomCapacity >= 10) {
      this.newRoomCapacity = 10;
    }
    else if (this.newRoomCapacity <= 0) {
      this.newRoomCapacity = null;
    }
  }
}
