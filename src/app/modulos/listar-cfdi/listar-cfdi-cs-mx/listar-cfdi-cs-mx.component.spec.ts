import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCfdiCsMxComponent } from './listar-cfdi-cs-mx.component';

describe('ListarCfdiCsMxComponent', () => {
  let component: ListarCfdiCsMxComponent;
  let fixture: ComponentFixture<ListarCfdiCsMxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarCfdiCsMxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCfdiCsMxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
