import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurrenceStepSallesComponent } from './recurrence-step-salles.component';

describe('RecurrenceStepSallesComponent', () => {
  let component: RecurrenceStepSallesComponent;
  let fixture: ComponentFixture<RecurrenceStepSallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurrenceStepSallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurrenceStepSallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
