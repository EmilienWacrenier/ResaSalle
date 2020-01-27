import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SallesAvecRecurrenceComponent } from './salles-avec-recurrence.component';

describe('SallesAvecRecurrenceComponent', () => {
  let component: SallesAvecRecurrenceComponent;
  let fixture: ComponentFixture<SallesAvecRecurrenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SallesAvecRecurrenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SallesAvecRecurrenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
