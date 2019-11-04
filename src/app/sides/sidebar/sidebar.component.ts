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
    this.Home();
    this.home= false;
    this.dashboard = true;
    this.search = true;
  }
  Home(){
    this.activate("button_home");
    this.desactivate("button_dashboard");
    this.desactivate("button_search");
    this.home = false;
    this.dashboard = true;
    this.search = true;
  }
  Dashboard(){
    this.desactivate("button_home");
    this.activate("button_dashboard");
    this.desactivate("button_search");
    this.home = true;
    this.dashboard = false;
    this.search = true;
  }
  Search(){
    this.desactivate("button_home");
    this.desactivate("button_dashboard");
    this.activate("button_search");
    this.home = true;
    this.dashboard = true;
    this.search = false;
  }
  activate(st : string){
    var square =document.getElementById(st);
    square.style.color= "white" ;
    square.style.borderLeftStyle = "solid";
    square.style.borderLeftColor = "rgba(255, 255, 255, 0.774)";
    square.style.borderLeftWidth = "5px";
  }
  desactivate(st : string){
    var square =document.getElementById(st);
    square.style.color= "rgba(255, 255, 255, 0.555)" ;
    square.style.borderLeftStyle = "none";
  }

}