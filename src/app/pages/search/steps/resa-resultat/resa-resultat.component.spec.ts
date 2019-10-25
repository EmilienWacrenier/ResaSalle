import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResaResultatComponent } from './resa-resultat.component';

describe('ResaResultatComponent', () => {
  let component: ResaResultatComponent;
  let fixture: ComponentFixture<ResaResultatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResaResultatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResaResultatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
