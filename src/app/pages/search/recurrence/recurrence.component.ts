import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recurrence',
  templateUrl: './recurrence.component.html',
  styleUrls: ['./recurrence.component.scss']
})
export class RecurrenceComponent implements OnInit {
   //variables pour le slide toggle pour activer la récurrence ou non
  selectedEndDateRecurrence: Date;
  selectedRecurrence: string;

  errorLabelRecurrence: string;
  errorEndDateRecurrence: string;

  datasRecurrenceAreGood = false;

  constructor() { }

  ngOnInit() {}
  
    //A LA SELECTION DE LA DATE
  //Met la valeur dans la variable selectedStartDate
  //Affiche la valeur dans une autre variable (selectedDateDisplay)
  onSelectEndDateRecurrence(event) {
    this.selectedEndDateRecurrence = event.value;
  }

  /* STEP RECURRENCE */
  /*
  checkInputRecurrence() {
    this.errorEndDateRecurrence = null;
    this.errorLabelRecurrence = null;

    if (!this.selectedEndDateRecurrence
      || !this.selectedRecurrence
      || this.endDateIsWrong(this.selectedDate, this.selectedEndDateRecurrence)) {
      this.errorCheckRecurrence();
      console.log(this.selectedEndDateRecurrence);
      console.log(this.selectedRecurrence);
      this.datasRecurrenceAreGood = false;
      console.log(this.datasRecurrenceAreGood);
    }
    else {
      this.datasRecurrenceAreGood = true;
      console.log(this.datasRecurrenceAreGood);
    }
  }


  errorCheckRecurrence() {
    //check si la date est selectionnée
    if (!this.selectedEndDateRecurrence || this.selectedEndDateRecurrence == null) {
      this.errorEndDateRecurrence = "Veuillez renseigner une date" ;
    }
    //check si la date selectionnée n'est pas passée
    else if (this.endDateIsWrong(this.selectedDate, this.selectedEndDateRecurrence)) {
      this.errorEndDateRecurrence = "Selectionner une date de fin de récurrence qui soit après la date de début"
    }

    if (!this.selectedRecurrence) { this.errorLabelRecurrence = "Veuillez selectionner une mensualité" };
  }

  endDateIsWrong(startDate, endDate) {
    console.log(startDate.getTime());
    console.log(endDate.getTime());

    if (endDate.getTime() < startDate.getTime()) { return true; }
    else return false;
  }
*/
}