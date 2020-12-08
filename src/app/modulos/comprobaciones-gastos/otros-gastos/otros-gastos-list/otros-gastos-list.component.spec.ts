import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrosGastosListComponent } from './otros-gastos-list.component';

describe('OtrosGastosListComponent', () => {
  let component: OtrosGastosListComponent;
  let fixture: ComponentFixture<OtrosGastosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtrosGastosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrosGastosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
