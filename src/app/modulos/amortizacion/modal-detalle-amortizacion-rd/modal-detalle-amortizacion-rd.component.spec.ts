import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleAmortizacionRdComponent } from './modal-detalle-amortizacion-rd.component';

describe('ModalDetalleAmortizacionRdComponent', () => {
  let component: ModalDetalleAmortizacionRdComponent;
  let fixture: ComponentFixture<ModalDetalleAmortizacionRdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetalleAmortizacionRdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetalleAmortizacionRdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
