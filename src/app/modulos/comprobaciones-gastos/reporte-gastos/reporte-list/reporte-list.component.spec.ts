import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteListComponent } from './reporte-list.component';

describe('ReporteListComponent', () => {
  let component: ReporteListComponent;
  let fixture: ComponentFixture<ReporteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
