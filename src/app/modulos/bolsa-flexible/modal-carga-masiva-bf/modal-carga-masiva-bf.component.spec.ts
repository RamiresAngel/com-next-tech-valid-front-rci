import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCargaMasivaBfComponent } from './modal-carga-masiva-bf.component';

describe('ModalCargaMasivaBfComponent', () => {
  let component: ModalCargaMasivaBfComponent;
  let fixture: ComponentFixture<ModalCargaMasivaBfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCargaMasivaBfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCargaMasivaBfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
