import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestacionesListComponent } from './prestaciones-list.component';

describe('PrestacionesListComponent', () => {
  let component: PrestacionesListComponent;
  let fixture: ComponentFixture<PrestacionesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestacionesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestacionesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
