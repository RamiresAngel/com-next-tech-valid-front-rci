import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComrpobacionHeaderComponent } from './form-comrpobacion-header.component';

describe('FormComrpobacionHeaderComponent', () => {
  let component: FormComrpobacionHeaderComponent;
  let fixture: ComponentFixture<FormComrpobacionHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComrpobacionHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComrpobacionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
