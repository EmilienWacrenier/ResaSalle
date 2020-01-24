import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/classes/user';

import * as moment from 'moment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  currentUser: User;

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
  }



}

