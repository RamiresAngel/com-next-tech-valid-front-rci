import { TestBed, inject } from '@angular/core/testing';

import { ComprobacionesGastosService } from './comprobaciones-gastos.service';

describe('ComprobacionesGastosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComprobacionesGastosService]
    });
  });

  it('should be created', inject([ComprobacionesGastosService], (service: ComprobacionesGastosService) => {
    expect(service).toBeTruthy();
  }));
});
