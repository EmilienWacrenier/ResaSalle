import { Component, OnInit } from '@angular/core';


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
    this.home= false;
    this.dashboard = true;
    this.search = true;
  }
  Home(){
    this.home = false;
    this.dashboard = true;
    this.search = true;
  }
  Dashboard(){
    this.home = true;
    this.dashboard = false;
    this.search = true;
  }
  Search(){
    this.home = true;
    this.dashboard = true;
    this.search = false;
  }

}
