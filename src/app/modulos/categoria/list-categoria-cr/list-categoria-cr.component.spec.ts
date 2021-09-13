import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategoriaCrComponent } from './list-categoria-cr.component';

describe('ListCategoriaCrComponent', () => {
  let component: ListCategoriaCrComponent;
  let fixture: ComponentFixture<ListCategoriaCrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCategoriaCrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCategoriaCrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
