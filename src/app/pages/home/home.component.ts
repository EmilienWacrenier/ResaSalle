import { Component, OnInit } from '@angular/core';

export interface Periode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  periodes: Periode[] = [
    {value: 'matin-0', viewValue: 'Matin'},
    {value: 'apresmidi-1', viewValue: 'Après-midi'},
  ];
}
