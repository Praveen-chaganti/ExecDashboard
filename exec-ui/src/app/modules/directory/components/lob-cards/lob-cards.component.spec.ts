import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LobCardsComponent } from './lob-cards.component';

describe('LobCardsComponent', () => {
  let component: LobCardsComponent;
  let fixture: ComponentFixture<LobCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LobCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LobCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
