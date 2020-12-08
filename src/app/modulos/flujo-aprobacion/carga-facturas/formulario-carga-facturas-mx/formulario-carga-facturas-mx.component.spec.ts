import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCargaFacturasMxComponent } from './formulario-carga-facturas-mx.component';

describe('FormularioCargaFacturasMxComponent', () => {
  let component: FormularioCargaFacturasMxComponent;
  let fixture: ComponentFixture<FormularioCargaFacturasMxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioCargaFacturasMxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioCargaFacturasMxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
