import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SallesSansRecurrenceComponent } from './salles-sans-recurrence.component';

describe('SallesSansRecurrenceComponent', () => {
  let component: SallesSansRecurrenceComponent;
  let fixture: ComponentFixture<SallesSansRecurrenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SallesSansRecurrenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SallesSansRecurrenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
