import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-bookingdetails',
  templateUrl: './bookingdetails.component.html',
  styleUrls: ['./bookingdetails.component.scss']
})

export class BookingdetailsComponent implements OnInit {

  objetReunion: string = "Café dans la salle Maroilles"; // objet de la réunion pour test
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

  constructor( public bookingDetailsDialogRef: MatDialogRef<BookingdetailsComponent> ) {}

  ngOnInit() {
  }

  close() {
    this.bookingDetailsDialogRef.close();
  }
  //Affichage des vignettes
  //parcours d'une collection de users selectionnés et insertion de value cf hmtl l.23 [value]="user.miniature"
  onSelect(v) {
    this.selectedMiniatures=[];
    for(let a of v) {
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
