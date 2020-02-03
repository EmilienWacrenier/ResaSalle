import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { RoomService } from 'src/app/services/room.service';
import { Booking } from 'src/app/classes/booking';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DeleteConfirmationComponent, ConfirmDeleteModel } from '../../modals/delete-confirmation/delete-confirmation.component';
import { MatTableDataSource } from '@angular/material';

import { ToastrService, ToastRef } from 'ngx-toastr';
import { ApiConstants } from '../../constantes/constantes';

import * as moment from 'moment'
import { EditBookingModel, EditBookingComponent } from 'src/app/modals/edit-booking/edit-booking.component';
import { Room } from 'src/app/classes/room';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  dsBooking: MatTableDataSource<Booking>;
  reservations$: Observable<Booking[]>;
  displayedColumns: string[] = ['date', 'start', 'end', 'room', 'subject', 'participants', 'actions'];
  dataSource$: Observable<Booking[]>;

  rooms: Room[];
  selectedRoomId: number = 1;
  resaPonctuelles: boolean = true;
  resaRecurrence: boolean = false;
  resaParSalles: boolean = false;
  resaOfToday: boolean = false;
  reservationsOfUser: Booking[];
  resaToday: Booking[];
  reservationsFilteredByObject: Booking[];


  constructor(
    private reservationService: ReservationService,
    private roomService: RoomService,
    public dialog: MatDialog,
    private cst: ApiConstants,
    private toastr: ToastrService) {
    this.dsBooking = new MatTableDataSource<Booking>();
    this.dsBooking.data = [];
  }

  ngOnInit() {
    this.updateReservations();
    this.getRooms();
  }

  //recherche de participants
  onKey(event) {
    this.reservationsFilteredByObject = [];

    let resaObjet = event.target.value.toLowerCase();
    console.log(resaObjet);

    this.reservationsFilteredByObject = this.reservationsOfUser.filter(resa =>
      resa.object.toLowerCase().includes(resaObjet));
  }

  onClickResaPonctuelles() {
    this.resaPonctuelles = true;
    this.resaRecurrence = false;
    this.resaParSalles = false;
    this.resaOfToday = false;
  }

  onClickResaRecurrence() {
    this.resaPonctuelles = false;
    this.resaRecurrence = true;
    this.resaParSalles = false;
    this.resaOfToday = false;
  }

  onClickResaParSalles() {
    this.resaPonctuelles = false;
    this.resaRecurrence = false;
    this.resaParSalles = true;
    this.resaOfToday = false;
  }

  onClickResaOfToday() {
    this.resaPonctuelles = false;
    this.resaRecurrence = false;
    this.resaParSalles = false;
    this.resaOfToday = true;

    this.resaToday = [];

    for (const resa of this.reservationsOfUser) {
      let resaDate = moment(resa.startDate).format('dddd DD MMM');
      if (resaDate == moment().format('dddd DD MMM')) {
        this.resaToday.push(resa);
      }
    }
  }

  getRooms() {
    this.roomService.getRooms().subscribe(res => {
      this.rooms = res['result'];
    })
  }

  getSelectedRoom(roomId) {
    this.selectedRoomId = roomId;
  }



  /*getReservationsbyUser(): Observable<Booking[]> {
    this.reservationService.getReservationsFromUserConnected();
  }*/

  deleteBooking(reservationId): void {
    const message = 'Souhaitez-vous vraiment supprimer cette réservation ? \n La suppression sera définitive';

    const dialogData = new ConfirmDeleteModel("Supprimer une réservation", message);

    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '400px',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        console.log(reservationId);
        // DO SOMETHING
        this.reservationService.removeReservation(reservationId).subscribe(
          (response) => {
            var a = response['result'];
            console.log('Result de remove :');
            console.log(a);
            this.toastr.success('Réservation supprimée !', this.cst.toastrTitle, this.cst.toastrOptions);

            this.updateReservations();
          },
          (error) => {
            console.log('Erreur Suppression ! : ' + error.error['result']);
            this.toastr.error(error.error['result'], this.cst.toastrTitle, this.cst.toastrOptions);

            this.updateReservations();
          }
        );
      }
    });
  }

  editBooking(booking) {
    console.log(booking);
    const dialogData = new EditBookingModel(booking);

    const dialogRef = this.dialog.open(EditBookingComponent, {
      width: '60vw',
      height: '80vh',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(
      () => this.updateReservations()
    );
  }

  updateReservations() {
    this.dsBooking.data = [];
    this.reservationService.getReservationsFromUserConnected().subscribe(
      (response) => {
        this.reservationsOfUser = response['result'];
        this.dsBooking.data = (response['result']);

        //for(const resa of this.dsBooking.data){
        //  resa.startDate = moment(resa.startDate).locale('fr').format('HH mm');
        //}

        console.log(this.dsBooking.data)
      }
    );
  }

  /*displayReservations(){
    this.reservationService.getReservationsFromUserConnected()
    .subscribe((response) => { this.dataSource = response['result']; console.log(this.dataSource) });
  }*/
}
