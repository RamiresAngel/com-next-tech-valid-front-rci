import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BolsaFlexibleListRciComponent } from './bolsa-flexible-list-rci.component';

describe('BolsaFlexibleListRciComponent', () => {
  let component: BolsaFlexibleListRciComponent;
  let fixture: ComponentFixture<BolsaFlexibleListRciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BolsaFlexibleListRciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BolsaFlexibleListRciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
