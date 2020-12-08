import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSolicitudCancelacionesComponent } from './list-solicitud-cancelaciones.component';

describe('ListSolicitudCancelacionesComponent', () => {
  let component: ListSolicitudCancelacionesComponent;
  let fixture: ComponentFixture<ListSolicitudCancelacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSolicitudCancelacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSolicitudCancelacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
