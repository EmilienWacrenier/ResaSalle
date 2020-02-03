import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursFeedbackStepComponent } from './hours-feedback-step.component';

describe('HoursFeedbackStepComponent', () => {
  let component: HoursFeedbackStepComponent;
  let fixture: ComponentFixture<HoursFeedbackStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoursFeedbackStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoursFeedbackStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
