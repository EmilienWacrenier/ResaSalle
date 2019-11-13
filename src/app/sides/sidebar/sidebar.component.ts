import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentUrl = this.router.url;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  forceDeactiveHome() {
    document.getElementById('homeNavItem').classList.remove('active-list-item');
  }
}

