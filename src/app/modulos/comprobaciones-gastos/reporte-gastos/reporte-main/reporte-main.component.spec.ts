import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMainComponent } from './reporte-main.component';

describe('ReporteMainComponent', () => {
  let component: ReporteMainComponent;
  let fixture: ComponentFixture<ReporteMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
