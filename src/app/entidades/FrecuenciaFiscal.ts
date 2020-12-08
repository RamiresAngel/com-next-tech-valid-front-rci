export class FrecuenciaFiscal {
  id: number;
  descripcion: string;
  identificador_corporativo: string;
  record_date: string;

  constructor() {
    this.id = 0;
    this.descripcion = '';
    this.identificador_corporativo = '';
    this.record_date = '';
  }
}

export class CuentaAgrupacionHeader {
  id: number;
  nombre: string;
  frecuencia_fiscal_id: number;
  valor_nacional: string;
  numero_dias: number;
  activo: number;
  tipo_gasto_id: number;
  corporativo_identificador: string;
  usuario_creo_identificador: string;
  cuenta_gasto_contribuyente: CuentaGastoContribuyente[];

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.frecuencia_fiscal_id = 0;
    this.valor_nacional = '';
    this.numero_dias = 0;
    this.activo = 0;
    this.tipo_gasto_id = 0;
    this.corporativo_identificador = '';
    this.usuario_creo_identificador = '';
    this.cuenta_gasto_contribuyente = new Array<CuentaGastoContribuyente>();
  }
}

export class CuentaGastoContribuyente {
  identificador_cuenta: string;
  cuenta: string;
  identificador_contribuyente: string;
  contribuyente: string;

  constructor() {
    this.identificador_cuenta = '';
    this.identificador_contribuyente = '';
  }
}
