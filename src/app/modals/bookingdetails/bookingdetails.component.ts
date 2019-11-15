import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Inject } from '@angular/core';

import { HOURS_PLANNING } from '../../constantes/constantes'
import { Room } from 'src/app/classes/room';

@Component({
  selector: 'app-bookingdetails',
  templateUrl: './bookingdetails.component.html',
  styleUrls: ['./bookingdetails.component.scss']
})

export class BookingdetailsComponent implements OnInit {

  room;

  objetReunion: string = "Reunion Objet"; // objet de la réunion pour test
  selectedMiniatures: string[]; //affichage des miniatures cf méthode onSelect()
  users: User[] = [ //liste d'utilisateurs pour test
    {
      lastName: 'amri',
      firstName: 'virginie',
      miniature: 'AV'
    },
    {
      lastName: 'pascal',
      firstName: 'marie flore',
      miniature: 'PMF'
    },
    {
      lastName: 'henry',
      firstName: 'stephanie',
      miniature: 'HS'
    },
    {
      lastName: 'villeminot',
      firstName: 'fabien',
      miniature: 'VF'
    },
    {
      lastName: 'boulo',
      firstName: 'lionel',
      miniature: 'BL'
    }
  ];

  bookingHours: string[] = HOURS_PLANNING;

  selectedHourStart;
  selectedHourEnd;

  constructor(
    public bookingDetailsDialogRef: MatDialogRef<BookingdetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) {}

  ngOnInit() {
    this.room = this.data.room;
    console.log(this.room.name);
  }

  close() {
    this.bookingDetailsDialogRef.close();
  }
  //Affichage des vignettes
  //parcours d'une collection de users selectionnés et insertion de value cf hmtl l.23 [value]="user.miniature"
  onSelect(v) {
    this.selectedMiniatures = [];
    for (let a of v) {
      this.selectedMiniatures.push(a.value);
    }
  }

}
//Interface User pour test (liste d'utilisateurs factice)
export interface User {
  lastName: string;
  firstName: string;
  miniature: string;
}
