import { Component, OnInit, HostListener } from '@angular/core';

import { MatStepper } from '@angular/material';
import { User } from 'src/app/classes/user';

import * as moment from 'moment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  currentUser: User;

  desktop: boolean;

  public innerWidth: any;

  recurrenceIsChecked: boolean = false;
  critereAreGood: boolean = false;

  startDateWithHours: string;
  endDateWithHours: string;

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.desktop) {
      if (window.innerWidth < 768) {
        this.desktop = false;
      }
    }
    else {
      if (window.innerWidth >= 768) {
        this.desktop = true;
      }
    }
  }

  ngOnInit() {
    if(window.innerWidth >= 768){
      this.desktop = true;
    }
    else{
      this.desktop = false;
    }
    console.log(this.recurrenceIsChecked);
    this.innerWidth = window.innerWidth;
  }

  onChangeRecurrence($event) {
    this.recurrenceIsChecked = $event;
    console.log(this.recurrenceIsChecked);
  }

}



