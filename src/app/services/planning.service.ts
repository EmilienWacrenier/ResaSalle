import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  private roomIdSource = new BehaviorSubject(0);

  //Observable string streams
  roomId$ = this.roomIdSource.asObservable();

  constructor() { }

  getRoomId(roomId: number) {
    this.roomIdSource.next(roomId);
  }

}