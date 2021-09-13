import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobacionPrestacionesComponent } from './aprobacion-prestaciones.component';

describe('AprobacionPrestacionesComponent', () => {
  let component: AprobacionPrestacionesComponent;
  let fixture: ComponentFixture<AprobacionPrestacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobacionPrestacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobacionPrestacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
