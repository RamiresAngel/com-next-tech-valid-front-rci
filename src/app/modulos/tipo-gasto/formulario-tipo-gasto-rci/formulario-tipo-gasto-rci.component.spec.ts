import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioTipoGastoRciComponent } from './formulario-tipo-gasto-rci.component';

describe('FormularioTipoGastoRciComponent', () => {
  let component: FormularioTipoGastoRciComponent;
  let fixture: ComponentFixture<FormularioTipoGastoRciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioTipoGastoRciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioTipoGastoRciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
