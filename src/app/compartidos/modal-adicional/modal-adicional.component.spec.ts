import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdicionalComponent } from './modal-adicional.component';

describe('ModalAdicionalComponent', () => {
  let component: ModalAdicionalComponent;
  let fixture: ComponentFixture<ModalAdicionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAdicionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAdicionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
