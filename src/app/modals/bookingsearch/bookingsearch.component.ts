import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ReservationService } from '../../services/reservation.service'
import { Room } from 'src/app/classes/room';
import { User } from 'src/app/classes/user';



@Component({
  selector: 'app-bookingsearch',
  templateUrl: './bookingsearch.component.html',
  styleUrls: ['./bookingsearch.component.scss']
})
export class BookingsearchComponent implements OnInit {

  room: Room;
  users: User[]
  objet: any;
  errorObjet: any;

  usersList;
  selectedParticipants = [];
  emailList = [];
 
  currentUser: any;
  baseMessage: string;

  constructor(
    private userService: UserService,
    private reservationService: ReservationService,
    public bookingDetailsDialogRef: MatDialogRef<BookingsearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    console.log(this.currentUser);
    console.log(this.data);
    //récupération des infos de la salle selectionnée par rapport au component parent
    this.room = this.data.room;
    //récupération des users en base
    this.getUsers();
  }

  //Appel à l'api pour avoir la liste des participants
  getUsers() {
    this.userService
      .getUsers()
      .subscribe(data => {
        this.users = data['result'];
        this.users.sort(
          (a, b) => a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase())
        );
        console.log(this.users);
        this.usersList = this.users;
      })
  }

  //recherche de participants
  onKey(event) {
    let valueSearch = event.target.value.toLowerCase();
    console.log(valueSearch);
    this.usersList = this.users.filter(user =>
      user.firstName.toLowerCase().includes(valueSearch)
      || user.lastName.toLowerCase().includes(valueSearch)
    );
  }

  //Affichage des vignettes
  //parcours d'une collection de users selectionnés et insertion de value cf hmtl l.23 [value]="user.miniature"
  onSelectParticipant(user) {
    console.log(user);
    if (this.selectedParticipants.includes(user)) {
      //supprime le participant
      this.selectedParticipants.splice(this.selectedParticipants.indexOf(user), 1);
    }
    else {
      //ajoute le participant
      this.selectedParticipants.push(user);
      console.log(this.selectedParticipants);
    }
  }

  //ajout d'un email quand on presse entrée
  onKeyEnter(event) {
    let valueEmail = event.target.value;
    this.emailList.push(valueEmail);
  }

  //supprimer un participant selectionné au clic
  removeParticipant(user) {
    this.selectedParticipants.splice(this.selectedParticipants.indexOf(user), 1);
  }

  //supprime un email ajouté au clic
  removeEmail(email) {
    this.emailList.splice(this.selectedParticipants.indexOf(email), 1);
  }

  //reset la liste des participants quand on clique sur le bouton reset
  resetParticipants() {
    this.selectedParticipants = [];
    this.emailList = [];
  }

  //au clic de la création de la réservation
  onSubmit() {
    this.errorObjet = null;

    if (!this.objet) {
      this.errorCheck();
      console.log(this.objet)
    }
    else {
      let participantIdList = [];
      for (const participant of this.selectedParticipants) {
        participantIdList.push(participant.userId);
      }

      console.log(participantIdList);

      let reservation = {
        startDate: this.data.startDate,
        endDate: this.data.endDate,
        object: this.objet,
        userId: this.currentUser.userId,
        roomId: this.data.room.roomId,
        users: participantIdList
      };

      console.log('La réservation : ' + reservation.startDate);
      console.log('La réservation : ' + reservation.endDate);
      console.log('La réservation : ' + reservation.object);
      console.log('La réservation : ' + reservation.userId);
      console.log('La réservation : ' + reservation.roomId);
      console.log('La réservation : ' + reservation.users);

      this.createReservation(reservation);
    }
  }

  createReservation(reservation) {
    this.reservationService.createReservation(reservation)
      .subscribe(
        () => {
          this.baseMessage = "Réservation créée";

          setTimeout(() => this.bookingDetailsDialogRef.close(), 1000);
        }, (error) => {
          console.log(error);
          this.baseMessage = error;
          console.log(this.baseMessage);
        }
      );
  }

  errorCheck() {
    //check si le champ objet est vide
    if (!this.objet) { this.errorObjet = "Veuillez renseigner un objet" };
  }

}
