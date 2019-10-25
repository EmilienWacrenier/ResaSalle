import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResaCaracteristiqueComponent } from './resa-caracteristique.component';

describe('ResaCaracteristiqueComponent', () => {
  let component: ResaCaracteristiqueComponent;
  let fixture: ComponentFixture<ResaCaracteristiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResaCaracteristiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResaCaracteristiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
