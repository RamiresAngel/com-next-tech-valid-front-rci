import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComplementoPagoPaisComponent } from './list-complemento-pago-pais.component';

describe('ListComplementoPagoPaisComponent', () => {
  let component: ListComplementoPagoPaisComponent;
  let fixture: ComponentFixture<ListComplementoPagoPaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComplementoPagoPaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComplementoPagoPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
