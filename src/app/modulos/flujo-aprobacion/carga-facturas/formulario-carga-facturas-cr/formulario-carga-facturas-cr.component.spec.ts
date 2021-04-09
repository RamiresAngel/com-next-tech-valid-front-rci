import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCargaFacturasCrComponent } from './formulario-carga-facturas-cr.component';

describe('FormularioCargaFacturasCrComponent', () => {
  let component: FormularioCargaFacturasCrComponent;
  let fixture: ComponentFixture<FormularioCargaFacturasCrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioCargaFacturasCrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioCargaFacturasCrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
