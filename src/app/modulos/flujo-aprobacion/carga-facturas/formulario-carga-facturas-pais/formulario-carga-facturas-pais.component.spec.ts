import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCargaFacturasPaisComponent } from './formulario-carga-facturas-pais.component';

describe('FormularioCargaFacturasPaisComponent', () => {
  let component: FormularioCargaFacturasPaisComponent;
  let fixture: ComponentFixture<FormularioCargaFacturasPaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioCargaFacturasPaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioCargaFacturasPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
