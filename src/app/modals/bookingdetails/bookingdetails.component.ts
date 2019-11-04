import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-bookingdetails',
  templateUrl: './bookingdetails.component.html',
  styleUrls: ['./bookingdetails.component.scss']
})
export class BookingdetailsComponent implements OnInit {

  objetReunion: string = "Café dans la salle Maroilles";

  users = [
    {
      lastName: 'amri',
      firstName: 'virginie',
      miniature: 'a v'
    },
    {
      lastName: 'pascal',
      firstName: 'marie flore',
      miniature: 'p m f'
    },
    {
      lastName: 'henry',
      firstName: 'stephanie',
      miniature: 'h s'
    },
    {
      lastName: 'villeminot',
      firstName: 'fabien',
      miniature: 'v f'
    },
    {
      lastName: 'boulo',
      firstName: 'lionel',
      miniature: 'b l'
    }
  ];

  constructor( public bookingDetailsDialogRef: MatDialogRef<BookingdetailsComponent> ) {}

  ngOnInit() {
  }

  close() {
    this.bookingDetailsDialogRef.close();
  }

}
