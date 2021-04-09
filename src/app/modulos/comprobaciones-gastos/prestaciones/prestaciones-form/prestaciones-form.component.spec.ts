import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestacionesFormComponent } from './prestaciones-form.component';

describe('PrestacionesFormComponent', () => {
  let component: PrestacionesFormComponent;
  let fixture: ComponentFixture<PrestacionesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestacionesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestacionesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
