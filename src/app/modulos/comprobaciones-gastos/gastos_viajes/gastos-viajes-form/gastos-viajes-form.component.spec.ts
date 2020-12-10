import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosViajesFormComponent } from './gastos-viajes-form.component';

describe('GastosViajesFormComponent', () => {
  let component: GastosViajesFormComponent;
  let fixture: ComponentFixture<GastosViajesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastosViajesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosViajesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
