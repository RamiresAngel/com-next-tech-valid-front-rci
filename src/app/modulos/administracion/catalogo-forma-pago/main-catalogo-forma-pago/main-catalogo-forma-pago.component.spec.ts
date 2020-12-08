import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCatalogoFormaPagoComponent } from './main-catalogo-forma-pago.component';

describe('MainCatalogoFormaPagoComponent', () => {
  let component: MainCatalogoFormaPagoComponent;
  let fixture: ComponentFixture<MainCatalogoFormaPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCatalogoFormaPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCatalogoFormaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
