import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCargaFacturasCrComponent } from './list-carga-facturas-cr.component';

describe('ListCargaFacturasCrComponent', () => {
  let component: ListCargaFacturasCrComponent;
  let fixture: ComponentFixture<ListCargaFacturasCrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCargaFacturasCrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCargaFacturasCrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
