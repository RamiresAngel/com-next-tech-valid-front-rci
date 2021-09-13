import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCredencialesComponent } from './list-credenciales.component';

describe('ListCredencialesComponent', () => {
  let component: ListCredencialesComponent;
  let fixture: ComponentFixture<ListCredencialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCredencialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCredencialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
