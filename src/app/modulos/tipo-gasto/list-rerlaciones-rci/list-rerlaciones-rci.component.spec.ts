import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRerlacionesRciComponent } from './list-rerlaciones-rci.component';

describe('ListRerlacionesRciComponent', () => {
  let component: ListRerlacionesRciComponent;
  let fixture: ComponentFixture<ListRerlacionesRciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRerlacionesRciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRerlacionesRciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
