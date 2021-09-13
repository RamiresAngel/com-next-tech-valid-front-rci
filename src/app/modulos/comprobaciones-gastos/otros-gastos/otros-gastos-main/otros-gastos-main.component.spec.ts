import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrosGastosMainComponent } from './otros-gastos-main.component';

describe('OtrosGastosMainComponent', () => {
  let component: OtrosGastosMainComponent;
  let fixture: ComponentFixture<OtrosGastosMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtrosGastosMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrosGastosMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
