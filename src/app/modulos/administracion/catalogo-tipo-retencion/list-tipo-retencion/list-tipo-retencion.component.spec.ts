import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTipoRetencionComponent } from './list-tipo-retencion.component';

describe('ListTipoRetencionComponent', () => {
  let component: ListTipoRetencionComponent;
  let fixture: ComponentFixture<ListTipoRetencionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTipoRetencionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTipoRetencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
