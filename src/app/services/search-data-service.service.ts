import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchDataServiceService {

  //Observable string sources
  private startDateSource = new BehaviorSubject('');
  private criteresAreGoodSource = new BehaviorSubject(false);

  //Observable string streams
  startDate$ = this.startDateSource.asObservable();
  critereAreGood$ = this.criteresAreGoodSource.asObservable();

  constructor() { }

  getStartDate(date: string) {
    this.startDateSource.next(date);
  }

  getCriteresAreGood(critereAreGood: boolean){
    this.criteresAreGoodSource.next(critereAreGood);
  }

}
