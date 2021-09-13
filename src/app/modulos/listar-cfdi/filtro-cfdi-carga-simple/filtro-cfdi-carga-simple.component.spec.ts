import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroCfdiCargaSimpleComponent } from './filtro-cfdi-carga-simple.component';

describe('FiltroCfdiCargaSimpleComponent', () => {
  let component: FiltroCfdiCargaSimpleComponent;
  let fixture: ComponentFixture<FiltroCfdiCargaSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroCfdiCargaSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroCfdiCargaSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
