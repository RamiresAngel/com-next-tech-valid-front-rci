import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobacionOtrosGastosComponent } from './aprobacion-otros-gastos.component';

describe('AprobacionOtrosGastosComponent', () => {
  let component: AprobacionOtrosGastosComponent;
  let fixture: ComponentFixture<AprobacionOtrosGastosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobacionOtrosGastosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobacionOtrosGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
