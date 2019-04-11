import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {Engg_maturity_dashboardComponent} from "./engg-maturity-dashboard.component";

describe('EnggMaturityDashboardComponent', () => {
  let component: Engg_maturity_dashboardComponent;
  let fixture: ComponentFixture<Engg_maturity_dashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Engg_maturity_dashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Engg_maturity_dashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
