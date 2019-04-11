import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnggMaturityProductDetailComponent } from './engg-maturity-product-detail.component';

describe('EnggMaturityProductDetailComponent', () => {
  let component: EnggMaturityProductDetailComponent;
  let fixture: ComponentFixture<EnggMaturityProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnggMaturityProductDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnggMaturityProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
