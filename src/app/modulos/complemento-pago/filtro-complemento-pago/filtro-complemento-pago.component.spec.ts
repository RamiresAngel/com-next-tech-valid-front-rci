import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroComplementoPagoComponent } from './filtro-complemento-pago.component';

describe('FiltroComplementoPagoComponent', () => {
  let component: FiltroComplementoPagoComponent;
  let fixture: ComponentFixture<FiltroComplementoPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroComplementoPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroComplementoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
