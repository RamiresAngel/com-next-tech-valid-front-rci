import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCargaFacturasMxComponent } from './list-carga-facturas-mx.component';

describe('ListCargaFacturasMxComponent', () => {
  let component: ListCargaFacturasMxComponent;
  let fixture: ComponentFixture<ListCargaFacturasMxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCargaFacturasMxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCargaFacturasMxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
