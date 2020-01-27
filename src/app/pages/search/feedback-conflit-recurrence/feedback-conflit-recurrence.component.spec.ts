import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackConflitRecurrenceComponent } from './feedback-conflit-recurrence.component';

describe('FeedbackConflitRecurrenceComponent', () => {
  let component: FeedbackConflitRecurrenceComponent;
  let fixture: ComponentFixture<FeedbackConflitRecurrenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackConflitRecurrenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackConflitRecurrenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
