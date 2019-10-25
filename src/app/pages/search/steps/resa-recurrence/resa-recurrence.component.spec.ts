import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResaRecurrenceComponent } from './resa-recurrence.component';

describe('ResaRecurrenceComponent', () => {
  let component: ResaRecurrenceComponent;
  let fixture: ComponentFixture<ResaRecurrenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResaRecurrenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResaRecurrenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
