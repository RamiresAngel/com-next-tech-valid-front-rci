import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetallePeriodosRdComponent } from './modal-detalle-periodos-rd.component';

describe('ModalDetallePeriodosRdComponent', () => {
  let component: ModalDetallePeriodosRdComponent;
  let fixture: ComponentFixture<ModalDetallePeriodosRdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetallePeriodosRdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetallePeriodosRdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
