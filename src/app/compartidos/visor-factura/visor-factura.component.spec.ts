import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorFacturaComponent } from './visor-factura.component';

describe('VisorFacturaComponent', () => {
  let component: VisorFacturaComponent;
  let fixture: ComponentFixture<VisorFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisorFacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisorFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
