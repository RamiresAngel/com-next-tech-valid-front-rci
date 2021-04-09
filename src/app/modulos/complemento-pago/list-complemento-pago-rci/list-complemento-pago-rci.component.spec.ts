import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComplementoPagoRciComponent } from './list-complemento-pago-rci.component';

describe('ListComplementoPagoRciComponent', () => {
  let component: ListComplementoPagoRciComponent;
  let fixture: ComponentFixture<ListComplementoPagoRciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComplementoPagoRciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComplementoPagoRciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
