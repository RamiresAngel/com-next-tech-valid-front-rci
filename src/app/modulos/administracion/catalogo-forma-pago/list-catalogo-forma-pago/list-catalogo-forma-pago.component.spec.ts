import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCatalogoFormaPagoComponent } from './list-catalogo-forma-pago.component';

describe('ListCatalogoFormaPagoComponent', () => {
  let component: ListCatalogoFormaPagoComponent;
  let fixture: ComponentFixture<ListCatalogoFormaPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCatalogoFormaPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCatalogoFormaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
