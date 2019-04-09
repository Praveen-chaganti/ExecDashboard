import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LobCardComponent } from './lob-card.component';

describe('LobCardComponent', () => {
  let component: LobCardComponent;
  let fixture: ComponentFixture<LobCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LobCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LobCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
