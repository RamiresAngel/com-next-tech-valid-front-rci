import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroGenericoComponent } from './filtro-generico.component';

describe('FiltroGenericoComponent', () => {
  let component: FiltroGenericoComponent;
  let fixture: ComponentFixture<FiltroGenericoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroGenericoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
