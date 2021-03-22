import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConceptosComprobantesComponent } from './modal-conceptos-comprobantes.component';

describe('ModalConceptosComprobantesComponent', () => {
  let component: ModalConceptosComprobantesComponent;
  let fixture: ComponentFixture<ModalConceptosComprobantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalConceptosComprobantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConceptosComprobantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
