import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarAnexoComponent } from './modal-agregar-anexo.component';

describe('ModalAgregarAnexoComponent', () => {
  let component: ModalAgregarAnexoComponent;
  let fixture: ComponentFixture<ModalAgregarAnexoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAgregarAnexoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarAnexoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
