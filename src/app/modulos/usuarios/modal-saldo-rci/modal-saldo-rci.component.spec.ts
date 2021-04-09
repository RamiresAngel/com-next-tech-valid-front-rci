import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSaldoRciComponent } from './modal-saldo-rci.component';

describe('ModalSaldoRciComponent', () => {
  let component: ModalSaldoRciComponent;
  let fixture: ComponentFixture<ModalSaldoRciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSaldoRciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSaldoRciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
