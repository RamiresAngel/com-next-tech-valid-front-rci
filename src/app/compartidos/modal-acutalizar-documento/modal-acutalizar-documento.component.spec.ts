import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAcutalizarDocumentoComponent } from './modal-acutalizar-documento.component';

describe('ModalAcutalizarDocumentoComponent', () => {
  let component: ModalAcutalizarDocumentoComponent;
  let fixture: ComponentFixture<ModalAcutalizarDocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAcutalizarDocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAcutalizarDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
