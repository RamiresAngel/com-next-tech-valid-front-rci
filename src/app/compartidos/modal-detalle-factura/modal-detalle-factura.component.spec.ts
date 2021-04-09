import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleFacturaComponent } from './modal-detalle-factura.component';

describe('ModalDetalleFacturaComponent', () => {
  let component: ModalDetalleFacturaComponent;
  let fixture: ComponentFixture<ModalDetalleFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetalleFacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetalleFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
