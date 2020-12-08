import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComprobacionComponent } from './header-comprobacion.component';

describe('HeaderComprobacionComponent', () => {
  let component: HeaderComprobacionComponent;
  let fixture: ComponentFixture<HeaderComprobacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComprobacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComprobacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
