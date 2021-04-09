import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCredencialesComponent } from './main-credenciales.component';

describe('MainCredencialesComponent', () => {
  let component: MainCredencialesComponent;
  let fixture: ComponentFixture<MainCredencialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCredencialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCredencialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
