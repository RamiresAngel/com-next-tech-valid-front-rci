import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFiltroGenericoComponent } from './input-filtro-generico.component';

describe('InputFiltroGenericoComponent', () => {
  let component: InputFiltroGenericoComponent;
  let fixture: ComponentFixture<InputFiltroGenericoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputFiltroGenericoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFiltroGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
