import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCatalogoFormaPagoComponent } from './form-catalogo-forma-pago.component';

describe('FormCatalogoFormaPagoComponent', () => {
  let component: FormCatalogoFormaPagoComponent;
  let fixture: ComponentFixture<FormCatalogoFormaPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCatalogoFormaPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCatalogoFormaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
