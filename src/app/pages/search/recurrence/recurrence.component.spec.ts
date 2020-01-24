import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurrenceComponent } from './recurrence.component';

describe('RecurrenceComponent', () => {
  let component: RecurrenceComponent;
  let fixture: ComponentFixture<RecurrenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurrenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurrenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
