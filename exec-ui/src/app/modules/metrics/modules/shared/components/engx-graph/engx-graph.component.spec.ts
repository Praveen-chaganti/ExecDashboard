import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngxGraphComponent } from './engx-graph.component';

describe('EngxGraphComponent', () => {
  let component: EngxGraphComponent;
  let fixture: ComponentFixture<EngxGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngxGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngxGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
