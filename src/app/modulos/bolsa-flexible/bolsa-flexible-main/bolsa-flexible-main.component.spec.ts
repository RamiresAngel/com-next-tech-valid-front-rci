import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BolsaFlexibleMainComponent } from './bolsa-flexible-main.component';

describe('BolsaFlexibleMainComponent', () => {
  let component: BolsaFlexibleMainComponent;
  let fixture: ComponentFixture<BolsaFlexibleMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BolsaFlexibleMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BolsaFlexibleMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
