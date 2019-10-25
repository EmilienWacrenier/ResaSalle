import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResaDateComponent } from './resa-date.component';

describe('ResaDateComponent', () => {
  let component: ResaDateComponent;
  let fixture: ComponentFixture<ResaDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResaDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResaDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
