import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowchildComprobanteComponent } from './rowchild-comprobante.component';

describe('RowchildComprobanteComponent', () => {
  let component: RowchildComprobanteComponent;
  let fixture: ComponentFixture<RowchildComprobanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowchildComprobanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowchildComprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
