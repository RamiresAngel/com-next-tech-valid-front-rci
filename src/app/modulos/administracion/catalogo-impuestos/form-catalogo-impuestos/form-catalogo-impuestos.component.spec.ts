import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCatalogoImpuestosComponent } from './form-catalogo-impuestos.component';

describe('FormCatalogoImpuestosComponent', () => {
  let component: FormCatalogoImpuestosComponent;
  let fixture: ComponentFixture<FormCatalogoImpuestosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCatalogoImpuestosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCatalogoImpuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
