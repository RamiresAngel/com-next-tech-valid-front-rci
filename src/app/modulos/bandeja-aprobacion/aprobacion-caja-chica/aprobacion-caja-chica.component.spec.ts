import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobacionCajaChicaComponent } from './aprobacion-caja-chica.component';

describe('AprobacionCajaChicaComponent', () => {
  let component: AprobacionCajaChicaComponent;
  let fixture: ComponentFixture<AprobacionCajaChicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobacionCajaChicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobacionCajaChicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
