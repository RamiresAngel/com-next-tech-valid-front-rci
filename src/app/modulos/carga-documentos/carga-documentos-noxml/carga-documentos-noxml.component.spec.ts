import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaDocumentosNoxmlComponent } from './carga-documentos-noxml.component';

describe('CargaDocumentosNoxmlComponent', () => {
  let component: CargaDocumentosNoxmlComponent;
  let fixture: ComponentFixture<CargaDocumentosNoxmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargaDocumentosNoxmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaDocumentosNoxmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
