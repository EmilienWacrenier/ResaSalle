import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BOOKING_MINUTES, BOOKING_HOURS } from 'src/app/constantes/constantes';
import * as moment from 'moment';

@Component({
  selector: 'app-hours-feedback-step',
  templateUrl: './hours-feedback-step.component.html',
  styleUrls: ['./hours-feedback-step.component.scss']
})
export class HoursFeedbackStepComponent implements OnInit {

  bookingHours: number[] = BOOKING_HOURS;
  bookingMinutes: number[] = BOOKING_MINUTES;

  selectedDate: Date;
  selectedHourStart: number;
  selectedMinuteStart: number;
  selectedHourEnd: number;
  selectedMinuteEnd: number;

  startDateWithHours: string;
  endDateWithHours: string;
  baseMessage: string;

  constructor(
    public hoursFeedbackStepDialogRef: MatDialogRef<HoursFeedbackStepComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log(this.data);
    this.setParamsOnInit(this.data.day, this.data.hour);
  }

  setParamsOnInit(day, hour) {
    this.selectedDate = new Date(moment().isoWeekday(day + 1).format());
    console.log(this.selectedDate);

    if (hour % 2 == 0) {
      this.selectedHourStart = this.bookingHours[hour / 2];
      this.selectedMinuteStart = this.bookingMinutes[0];
    }
    else if (hour % 2 == 1) {
      this.selectedHourStart = this.bookingHours[(hour - 1) / 2];
      this.selectedMinuteStart = this.bookingMinutes[1];
    }
    else console.log("erreur au parametrage");

    this.selectedHourEnd = this.selectedHourStart + 1;
    this.selectedMinuteEnd = this.selectedMinuteStart;
  }

  onSubmit() {
    this.startDateWithHours = moment(this.selectedDate)
      .set({ hour: this.selectedHourStart, minute: this.selectedMinuteStart, second: 0, millisecond: 0 })
      .format("YYYY-MM-DD HH:mm:ss");

    this.endDateWithHours = moment(this.selectedDate)
      .set({ hour: this.selectedHourEnd, minute: this.selectedMinuteEnd, second: 0, millisecond: 0 })
      .format("YYYY-MM-DD HH:mm:ss");

      this.data.reservation.startDate = this.startDateWithHours;
      this.data.reservation.endDate = this.endDateWithHours;
      this.data.reservation.roomId = this.data.roomId.toString();

    let reservation = this.data.reservation;

    console.log(reservation);

    this.baseMessage = "Horaires validés";
    
    setTimeout( () => this.hoursFeedbackStepDialogRef.close(reservation), 500 );
  }

   closeModal(): void {
    this.hoursFeedbackStepDialogRef.close(
      alert("Attention, les horaires ne seront pas validés")
    );
  }
}
