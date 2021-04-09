import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptosComprobacionComponent } from './conceptos-comprobacion.component';

describe('ConceptosComprobacionComponent', () => {
  let component: ConceptosComprobacionComponent;
  let fixture: ComponentFixture<ConceptosComprobacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConceptosComprobacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptosComprobacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
