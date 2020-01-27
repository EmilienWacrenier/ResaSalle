import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlayout',
  templateUrl: './userlayout.component.html',
  styleUrls: ['./userlayout.component.scss']
})
export class UserlayoutComponent implements OnInit {

  user;

  constructor(private router: Router) { 
    
    this.user = JSON.parse(localStorage.getItem('user'));
    if(!this.user){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    
  }

}
