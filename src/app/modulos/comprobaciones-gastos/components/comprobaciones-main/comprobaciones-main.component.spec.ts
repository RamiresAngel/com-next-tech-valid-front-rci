import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobacionesMainComponent } from './comprobaciones-main.component';

describe('ComprobacionesMainComponent', () => {
  let component: ComprobacionesMainComponent;
  let fixture: ComponentFixture<ComprobacionesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprobacionesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprobacionesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
