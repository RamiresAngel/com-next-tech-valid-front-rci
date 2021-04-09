import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaChicaFormComponent } from './caja-chica-form.component';

describe('CajaChicaFormComponent', () => {
  let component: CajaChicaFormComponent;
  let fixture: ComponentFixture<CajaChicaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CajaChicaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaChicaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
