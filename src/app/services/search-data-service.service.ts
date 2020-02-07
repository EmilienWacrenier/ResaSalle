import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Booking } from '../classes/booking';
import { Room } from '../classes/room';

@Injectable({
  providedIn: 'root'
})
export class SearchDataServiceService {

  //Observable string sources
  private startDateSource = new BehaviorSubject(new Date());
  private fullStartDateSource = new BehaviorSubject('');
  private fullEndDateSource = new BehaviorSubject('');
  private objectSource = new BehaviorSubject('');
  private roomSource = new BehaviorSubject(new Room);

  private recurrenceNameSource =  new BehaviorSubject('');
  private endDateRecurrenceSource = new BehaviorSubject('');

  private listeReservationCheckRecurrenceSource = new BehaviorSubject([]);

  //Observable string streams
  startDate$ = this.startDateSource.asObservable();
  fullStartDate$ = this.fullStartDateSource.asObservable();
  fullEndDate$ = this.fullEndDateSource.asObservable();
  object$ = this.objectSource.asObservable();
  room$ = this.roomSource.asObservable();

  recurrenceName$ = this.recurrenceNameSource.asObservable();
  endDateRecurrence$ = this.endDateRecurrenceSource.asObservable();

  listeReservationCheckRecurrence$ = this.listeReservationCheckRecurrenceSource.asObservable();

  constructor() { }

  getStartDate(startDate: Date){
    this.startDateSource.next(startDate);
  }

  getfullStartDate(startDate: string) {
    this.fullStartDateSource.next(startDate);    
  }

  getfullEndDate(endDate: string) {
    this.fullEndDateSource.next(endDate);
  }

  getObject(object: string){
    this.objectSource.next(object);
  }

  getRoom(room : Room){
    this.roomSource.next(room);
    console.log(room);
  }

  getRecurrenceName(recurrenceName : string){
    this.recurrenceNameSource.next(recurrenceName);
  }

  getEndDateRecurrence(endDateRecurrence : string){
    this.endDateRecurrenceSource.next(endDateRecurrence);
  }

  getlisteReservationCheckRecurrence(listeReservation : Booking[]){
    this.listeReservationCheckRecurrenceSource.next(listeReservation);
  }
}
