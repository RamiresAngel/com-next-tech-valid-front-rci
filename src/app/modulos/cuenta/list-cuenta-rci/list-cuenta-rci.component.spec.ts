import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCuentaRciComponent } from './list-cuenta-rci.component';

describe('ListCuentaRciComponent', () => {
  let component: ListCuentaRciComponent;
  let fixture: ComponentFixture<ListCuentaRciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCuentaRciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCuentaRciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
