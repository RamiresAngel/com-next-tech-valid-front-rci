import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleNotasCreditoComponent } from './modal-detalle-notas-credito.component';

describe('ModalDetalleNotasCreditoComponent', () => {
  let component: ModalDetalleNotasCreditoComponent;
  let fixture: ComponentFixture<ModalDetalleNotasCreditoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetalleNotasCreditoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetalleNotasCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
