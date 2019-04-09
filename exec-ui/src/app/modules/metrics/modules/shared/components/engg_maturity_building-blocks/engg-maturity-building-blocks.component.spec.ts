import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnggMaturityBuildingBlocksComponent } from './engg-maturity-building-blocks.component';

describe('EnggMaturityBuildingBlocksComponent', () => {
  let component: EnggMaturityBuildingBlocksComponent;
  let fixture: ComponentFixture<EnggMaturityBuildingBlocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnggMaturityBuildingBlocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnggMaturityBuildingBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
