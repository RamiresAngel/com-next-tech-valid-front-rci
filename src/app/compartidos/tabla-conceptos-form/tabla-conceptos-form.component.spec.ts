import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaConceptosFormComponent } from './tabla-conceptos-form.component';

describe('TablaConceptosFormComponent', () => {
  let component: TablaConceptosFormComponent;
  let fixture: ComponentFixture<TablaConceptosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaConceptosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaConceptosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
