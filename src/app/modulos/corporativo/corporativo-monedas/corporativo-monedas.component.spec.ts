import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporativoMonedasComponent } from './corporativo-monedas.component';

describe('CorporativoMonedasComponent', () => {
  let component: CorporativoMonedasComponent;
  let fixture: ComponentFixture<CorporativoMonedasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporativoMonedasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporativoMonedasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
