import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleCrComponent } from './modal-detalle-cr.component';

describe('ModalDetalleCrComponent', () => {
  let component: ModalDetalleCrComponent;
  let fixture: ComponentFixture<ModalDetalleCrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetalleCrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetalleCrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
