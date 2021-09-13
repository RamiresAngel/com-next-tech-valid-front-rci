import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFacturasProveedorRciComponent } from './list-facturas-proveedor-rci.component';

describe('ListFacturasProveedorRciComponent', () => {
  let component: ListFacturasProveedorRciComponent;
  let fixture: ComponentFixture<ListFacturasProveedorRciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFacturasProveedorRciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFacturasProveedorRciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
