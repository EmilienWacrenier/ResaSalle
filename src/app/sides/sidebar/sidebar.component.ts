import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  home : boolean;
  dashboard : boolean;
  search : boolean;
  constructor() { }

  ngOnInit() {
  }

}