import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Room } from '../../../classes/room'
import { Booking } from '../../../classes/booking'
import { HomeService } from '../../../services/home.service';
@Component({
  selector: 'app-room-planning',
  templateUrl: './room-planning.component.html',
  styleUrls: ['./room-planning.component.scss']
})
export class RoomPlanningComponent implements OnInit {

  room: Room;

  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    document.getElementById('homeNavItem').classList.add('active-list-item');
    this.getRoomPlanning();
    console.log(this.room);
  }

  goBack(){
    document.getElementById('homeNavItem').classList.remove('active-list-item');
    this.router.navigate(['']);
  }
  getRoomPlanning(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.homeService.getRoomPlanning(id)
      .subscribe(room => this.room = room);
  }
}
