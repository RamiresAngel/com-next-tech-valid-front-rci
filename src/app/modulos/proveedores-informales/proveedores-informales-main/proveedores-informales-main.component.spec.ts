import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresInformalesMainComponent } from './proveedores-informales-main.component';

describe('ProveedoresInformalesMainComponent', () => {
  let component: ProveedoresInformalesMainComponent;
  let fixture: ComponentFixture<ProveedoresInformalesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedoresInformalesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedoresInformalesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
