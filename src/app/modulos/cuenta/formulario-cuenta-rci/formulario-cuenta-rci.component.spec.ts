import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCuentaRciComponent } from './formulario-cuenta-rci.component';

describe('FormularioCuentaRciComponent', () => {
  let component: FormularioCuentaRciComponent;
  let fixture: ComponentFixture<FormularioCuentaRciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioCuentaRciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioCuentaRciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
