import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCatalogoImpuestosComponent } from './main-catalogo-impuestos.component';

describe('MainCatalogoImpuestosComponent', () => {
  let component: MainCatalogoImpuestosComponent;
  let fixture: ComponentFixture<MainCatalogoImpuestosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCatalogoImpuestosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCatalogoImpuestosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
