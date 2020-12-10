import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaChicaListComponent } from './caja-chica-list.component';

describe('CajaChicaListComponent', () => {
  let component: CajaChicaListComponent;
  let fixture: ComponentFixture<CajaChicaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CajaChicaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaChicaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
