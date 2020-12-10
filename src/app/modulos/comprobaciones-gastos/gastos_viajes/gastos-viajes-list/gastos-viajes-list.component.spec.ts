import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosViajesListComponent } from './gastos-viajes-list.component';

describe('GastosViajesListComponent', () => {
  let component: GastosViajesListComponent;
  let fixture: ComponentFixture<GastosViajesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastosViajesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosViajesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
