import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

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
    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup: FormGroup;
    fourthFormGroup: FormGroup;

    checked = false;

    selectedRecurrence: string;
    selectedMensualite: string;

    recurrences: string[] = RECURRENCE;
    numSemaines: string[] = NUMERO_SEMAINE;
    jourSemaines: string[] = JOUR_SEMAINE;
    capacites: number[] = CAPACITE;
    choix: number[] = [];

    constructor(private _formBuilder: FormBuilder) {}
  
    ngOnInit() {
      this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
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