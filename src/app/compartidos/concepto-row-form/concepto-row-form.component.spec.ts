import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoRowFormComponent } from './concepto-row-form.component';

describe('ConceptoRowFormComponent', () => {
  let component: ConceptoRowFormComponent;
  let fixture: ComponentFixture<ConceptoRowFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConceptoRowFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptoRowFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
