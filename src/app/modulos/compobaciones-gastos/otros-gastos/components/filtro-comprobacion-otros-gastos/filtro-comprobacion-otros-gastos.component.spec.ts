import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroComprobacionOtrosGastosComponent } from './filtro-comprobacion-otros-gastos.component';

describe('FiltroComprobacionOtrosGastosComponent', () => {
  let component: FiltroComprobacionOtrosGastosComponent;
  let fixture: ComponentFixture<FiltroComprobacionOtrosGastosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroComprobacionOtrosGastosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroComprobacionOtrosGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
