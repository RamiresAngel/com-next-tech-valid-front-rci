import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsuarioRciComponent } from './list-usuario-rci.component';

describe('ListUsuarioRciComponent', () => {
  let component: ListUsuarioRciComponent;
  let fixture: ComponentFixture<ListUsuarioRciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUsuarioRciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUsuarioRciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
