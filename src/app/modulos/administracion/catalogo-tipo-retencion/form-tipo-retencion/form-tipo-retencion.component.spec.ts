import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTipoRetencionComponent } from './form-tipo-retencion.component';

describe('FormTipoRetencionComponent', () => {
  let component: FormTipoRetencionComponent;
  let fixture: ComponentFixture<FormTipoRetencionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTipoRetencionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTipoRetencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
