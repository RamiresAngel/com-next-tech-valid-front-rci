import { ReporteGastosModule } from './reporte-gastos.module';

describe('ReporteGastosModule', () => {
  let reporteGastosModule: ReporteGastosModule;

  beforeEach(() => {
    reporteGastosModule = new ReporteGastosModule();
  });

  it('should create an instance', () => {
    expect(reporteGastosModule).toBeTruthy();
  });
});
