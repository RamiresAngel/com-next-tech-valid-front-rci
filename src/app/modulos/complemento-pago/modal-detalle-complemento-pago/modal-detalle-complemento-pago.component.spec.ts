import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleComplementoPagoComponent } from './modal-detalle-complemento-pago.component';

describe('ModalDetalleComplementoPagoComponent', () => {
  let component: ModalDetalleComplementoPagoComponent;
  let fixture: ComponentFixture<ModalDetalleComplementoPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetalleComplementoPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetalleComplementoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
