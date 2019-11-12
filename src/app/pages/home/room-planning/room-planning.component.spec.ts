import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomPlanningComponent } from './room-planning.component';

describe('RoomPlanningComponent', () => {
  let component: RoomPlanningComponent;
  let fixture: ComponentFixture<RoomPlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomPlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
