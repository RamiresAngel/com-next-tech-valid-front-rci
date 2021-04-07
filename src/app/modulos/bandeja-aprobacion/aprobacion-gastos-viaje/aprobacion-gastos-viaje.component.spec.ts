import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobacionGastosViajeComponent } from './aprobacion-gastos-viaje.component';

describe('AprobacionGastosViajeComponent', () => {
  let component: AprobacionGastosViajeComponent;
  let fixture: ComponentFixture<AprobacionGastosViajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobacionGastosViajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobacionGastosViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
