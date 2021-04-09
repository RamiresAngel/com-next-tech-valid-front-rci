import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAmortizacionRdComponent } from './lista-amortizacion-rd.component';

describe('ListaAmortizacionRdComponent', () => {
  let component: ListaAmortizacionRdComponent;
  let fixture: ComponentFixture<ListaAmortizacionRdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAmortizacionRdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAmortizacionRdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
