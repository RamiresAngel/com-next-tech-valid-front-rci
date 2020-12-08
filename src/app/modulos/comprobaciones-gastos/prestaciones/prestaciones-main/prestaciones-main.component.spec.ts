import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestacionesMainComponent } from './prestaciones-main.component';

describe('PrestacionesMainComponent', () => {
  let component: PrestacionesMainComponent;
  let fixture: ComponentFixture<PrestacionesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestacionesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestacionesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
