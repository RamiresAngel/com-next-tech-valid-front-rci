import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAprobacionSharedComponent } from './filtro-aprobacion-shared.component';

describe('FiltroAprobacionSharedComponent', () => {
  let component: FiltroAprobacionSharedComponent;
  let fixture: ComponentFixture<FiltroAprobacionSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAprobacionSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroAprobacionSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
