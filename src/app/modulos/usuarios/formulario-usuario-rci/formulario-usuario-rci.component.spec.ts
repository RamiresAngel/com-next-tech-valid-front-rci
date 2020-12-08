import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioUsuarioRciComponent } from './formulario-usuario-rci.component';

describe('FormularioUsuarioRciComponent', () => {
  let component: FormularioUsuarioRciComponent;
  let fixture: ComponentFixture<FormularioUsuarioRciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioUsuarioRciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioUsuarioRciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
