import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaChicaMainComponent } from './caja-chica-main.component';

describe('CajaChicaMainComponent', () => {
  let component: CajaChicaMainComponent;
  let fixture: ComponentFixture<CajaChicaMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CajaChicaMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaChicaMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
