import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSolicitudCancelacionesComponent } from './main-solicitud-cancelaciones.component';

describe('MainSolicitudCancelacionesComponent', () => {
  let component: MainSolicitudCancelacionesComponent;
  let fixture: ComponentFixture<MainSolicitudCancelacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainSolicitudCancelacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSolicitudCancelacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
