import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchDataServiceService {

  //Observable string sources
  private startDateSource = new BehaviorSubject(new Date());
  private fullStartDateSource = new BehaviorSubject('');
  private fullEndDateSource = new BehaviorSubject('');
  private objectSource = new BehaviorSubject('');

  private recurrenceNameSource =  new BehaviorSubject('');
  private endDateRecurrenceSource = new BehaviorSubject('');

  //Observable string streams
  startDate$ = this.startDateSource.asObservable();
  fullStartDate$ = this.fullStartDateSource.asObservable();
  fullEndDate$ = this.fullEndDateSource.asObservable();
  object$ = this.objectSource.asObservable();

  recurrenceName$ = this.recurrenceNameSource.asObservable();
  endDateRecurrence$ = this.endDateRecurrenceSource.asObservable();

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

  getRecurrenceName(recurrenceName : string){
    this.recurrenceNameSource.next(recurrenceName);
  }

  getEndDateRecurrence(endDateRecurrence : string){
    this.endDateRecurrenceSource.next(endDateRecurrence);
  }
}
