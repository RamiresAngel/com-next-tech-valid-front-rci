import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroSolicitudCancelacionesComponent } from './filtro-solicitud-cancelaciones.component';

describe('FiltroSolicitudCancelacionesComponent', () => {
  let component: FiltroSolicitudCancelacionesComponent;
  let fixture: ComponentFixture<FiltroSolicitudCancelacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroSolicitudCancelacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroSolicitudCancelacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
