import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosViajesMainComponent } from './gastos-viajes-main.component';

describe('GastosViajesMainComponent', () => {
  let component: GastosViajesMainComponent;
  let fixture: ComponentFixture<GastosViajesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastosViajesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosViajesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
