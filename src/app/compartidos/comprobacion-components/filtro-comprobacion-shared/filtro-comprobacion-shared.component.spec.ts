import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroComprobacionSharedComponent } from './filtro-comprobacion-shared.component';

describe('FiltroComprobacionSharedComponent', () => {
  let component: FiltroComprobacionSharedComponent;
  let fixture: ComponentFixture<FiltroComprobacionSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroComprobacionSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroComprobacionSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
