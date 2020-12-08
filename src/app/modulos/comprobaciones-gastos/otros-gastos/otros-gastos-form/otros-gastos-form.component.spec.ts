import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrosGastosFormComponent } from './otros-gastos-form.component';

describe('OtrosGastosFormComponent', () => {
  let component: OtrosGastosFormComponent;
  let fixture: ComponentFixture<OtrosGastosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtrosGastosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrosGastosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
