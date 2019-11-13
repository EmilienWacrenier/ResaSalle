import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

import { RECURRENCE } from "../../constantes/constantes";
import { NUMERO_SEMAINE } from "../../constantes/constantes";
import { JOUR_SEMAINE } from "../../constantes/constantes";
import { CAPACITE } from "../../constantes/constantes";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  dateFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  selectedDate: any;
  year: any;
  DayAndDate: string;

  time: any;
  time2: any;

  isChecked = false;
  checked = false;

  selectedRecurrence: string;
  selectedMensualite: string;

  recurrences: string[] = RECURRENCE;
  numSemaines: string[] = NUMERO_SEMAINE;
  jourSemaines: string[] = JOUR_SEMAINE;
  capacites: number[] = CAPACITE;
  choix: number[] = [];


  minuteStep = 30;

  constructor(private _formBuilder: FormBuilder, config: NgbTimepickerConfig) {
    config.seconds = false;
    config.spinners = true;
    config.size = "small";

    this.onSelect(this.selectedDate);
  }

  ngOnInit() {
    this.dateFormGroup = this._formBuilder.group({
      datePickerCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
  }

  onSelect(event) {
    console.log(event);
    this.selectedDate = event;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}