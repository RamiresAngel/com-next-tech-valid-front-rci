import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCredencialesComponent } from './form-credenciales.component';

describe('FormCredencialesComponent', () => {
  let component: FormCredencialesComponent;
  let fixture: ComponentFixture<FormCredencialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCredencialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCredencialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
