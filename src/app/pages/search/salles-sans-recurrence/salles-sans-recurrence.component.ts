import { Component, OnInit, Input } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/classes/room';
import { Subscription } from 'rxjs';
import { SearchDataServiceService } from 'src/app/services/search-data-service.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { User } from 'src/app/classes/user';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import {ConfirmationReservation,ConfirmationReservationComponent} from 'src/app/modals/confirmation-reservation/confirmation-reservation.component';
import {
  NUMERO_SEMAINE,
  JOUR_SEMAINE,
  BOOKING_HOURS,
  BOOKING_MINUTES
} from "../../../constantes/constantes";
import * as moment from 'moment';
import { Booking } from 'src/app/classes/booking';
import { ToastrService } from 'ngx-toastr';
import { ApiConstants } from 'src/app/constantes/constantes';

@Component({
  selector: 'app-salles-sans-recurrence',
  templateUrl: './salles-sans-recurrence.component.html',
  styleUrls: ['./salles-sans-recurrence.component.scss']
})
export class SallesSansRecurrenceComponent implements OnInit {

  @Input() user : User;

  dataSearchSubscription : Subscription;

  //variables de capacité
  roomRequiredCapacity: number = 6;

  //liste des salles (reponse)
  roomList = [];

  //variable salle
  selectedRoom: Room;

  fullStartDate : string;
  fullEndDate: string;
  object:string;
  selectedObject:string;
  selectedDate:string;
 
  constructor(
    private roomService: RoomService,
    private reservationService : ReservationService,
    private searchDataService : SearchDataServiceService,
    public dialog: MatDialog,
   /*  private toastr: ToastrService,
    private cst: ApiConstants, */
   /*  public dialogRef: MatDialogRef<SallesSansRecurrenceComponent> */
  ) {
  }

  ngOnInit() {
    this.searchDataService.fullStartDate$.subscribe(res => this.fullStartDate = res);
    this.searchDataService.fullEndDate$.subscribe(res => this.fullEndDate = res);
    this.searchDataService.object$.subscribe(res => this.object = res);
    this.getRoomsAvailable(this.roomRequiredCapacity, this.fullStartDate, this.fullEndDate);
  }
  

  onChangeCapacity() {
    this.selectedRoom = null;
    this.roomList = [];
    this.getRoomsAvailable(this.roomRequiredCapacity, this.fullStartDate, this.fullEndDate);
    }

    // Sélectionne une salle pour l'étape suivante, modifie les styles css sur la bonne card
  onSelectRoom(room) {
    if (room !== this.selectedRoom) {
      this.selectedRoom = room;
    }
  }
  
  getRoomsAvailable(capacity, startDate, endDate) {

      this.roomService
        .getAvailableRooms(capacity, startDate, endDate)
        .subscribe(data => {
          this.roomList = data['result'];
          console.log(this.roomList)
        })
    }
   /*  onNoClick(): void {
      this.dialogRef.close();
    } */

    createReservation(){
      const message =`Souhaitez-vous vraiment réserver la salle` ;
      const dialogData = new ConfirmationReservation(
        `Confirmer votre réservation`, 
        message, 
        this.selectedRoom.name, 
        this.fullStartDate =moment(this.fullStartDate).locale("fr").format('dddd Do MMMM YYYY [de] H[h]mm'),
        this.fullEndDate =moment(this.fullEndDate).format('[ à] H[h]mm'),
        this.object
        );
      const dialogRef = this.dialog.open(ConfirmationReservationComponent, {
        width: '400px',
        data: dialogData
      });

      /* dialogRef.afterClosed().subscribe( ()=>  this.onSubmit() */
        
        
        /*  { */
        /* if (result){ */
           /* this.reservationService.createReservation(Booking).subscribe(
            (response) => {
              this.toastr.success(`Réservation validé !`, this.cst.toastrTitle, this.cst.toastrOptions); */
             /*  this.dialogRef.close(); 
              this.createReservation(); */
            /* },
            (error) => {
              this.toastr.error(error.error['result'], this.cst.toastrTitle, this.cst.toastrOptions); */
             /*  this.createReservation(); */
            /* }
          ); */  
       /*  } */
      /* } *//* ); */
    
       
         
       
      /* let reservation = {
        startDate : this.fullStartDate,
        endDate : this.fullEndDate,
        object : this.object,
        userId : this.user.userId,
        roomId: this.selectedRoom.roomId
      }
      console.log(reservation); */
      //this.reservationService.createReservation(reservation);
    }

}
