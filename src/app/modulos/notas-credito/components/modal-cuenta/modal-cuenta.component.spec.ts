import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCuentaComponent } from './modal-cuenta.component';

describe('ModalCuentaComponent', () => {
  let component: ModalCuentaComponent;
  let fixture: ComponentFixture<ModalCuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
