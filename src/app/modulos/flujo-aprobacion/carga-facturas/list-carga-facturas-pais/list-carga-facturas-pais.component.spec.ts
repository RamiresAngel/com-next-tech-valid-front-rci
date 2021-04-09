import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCargaFacturasPaisComponent } from './list-carga-facturas-pais.component';

describe('ListCargaFacturasPaisComponent', () => {
  let component: ListCargaFacturasPaisComponent;
  let fixture: ComponentFixture<ListCargaFacturasPaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCargaFacturasPaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCargaFacturasPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
