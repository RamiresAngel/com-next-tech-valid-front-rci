export class Amortizacion {
  identificador_contribuyente: string;
  identificador_corporativo: string;
  identificador_sucursal: string;
  identificador_proveedor: string;
  identificador_usuario: string;
  identificador_cuenta: string;
  identificador_departamento: string;
  fecha_inicio: string;
  fecha_fin: string;
  id_cuenta_agrupacion: string;
  tipo_movimiento: number;
  id_tipo_gasto: number;
  xml: string;
  pdf: string;
  descripcion: string;
  lista_negra: number;
}

export class DetalleAmortizacion {
  id: number;
  sucursal_identificador: string;
  documentos_cfdi_id: number;
  cuenta_identificador: string;
  proveedor_identificador: string;
  estatus: number;
  fecha_creacion: string;
  periodo_inicio: string;
  periodo_fin: string;
  usuario_identificador: string;
  preliminar_id: number;
  contribuyente_identificador: string;
  corporativo_identificador: string;
  usuario: string;
  cuenta: string;
  sucursal: string;
  empresa: string;
  estatus_descripcion: string;
  descripcion: string;
  folio_fiscal: string;
  folio: string;
  serie: string;
  subtotal: number;
  total_factura: number;
  numero_periodos: number;
  acreedor: string;
  codigo: string;
  razon_social: string;
  detalle: DetalleDetalleAmortizacion[];
  cosntructor() {
    this.detalle = new Array<DetalleDetalleAmortizacion>();
  }
}
export class DetalleDetalleAmortizacion {
  id: number;
  amortizacion_header_id: number;
  numero_periodo: number;
  fecha_inicio: string;
  fecha_fin: string;
  importe: number;
  estatus: number;
  fecha_contabilizacion: string;
  preliminar_id: number;
  numero_sap: string;
  estatus_descripcion: string;
}

export class Periodos {
  numeroPeriodo: number;
  vigente: boolean;
  fechaInicio: string;
  fechaFin: string;
  importe: number;
  porcentaje: number;
  montoFinal: number;
  estatus: string;
  fechaContabilizacion: string;
  numSAP: string;
  preliminarId: string;
}

export class AmortizacionRD {
  identificador_contribuyente: string;
  identificador_sucursal: string;
  identificador_acreedor: string;
  identificador_cuenta_departamento: string;
  nfc: string;
  moneda: string;
  fecha_factura: string;
  importe: string;
  descripcion: string;
  impuesto: string;
  forma_pago: string;
  total: string;
  archivo: string;
  inicio_periodo: string;
  fin_periodo: string;

  constructor() {
    this.identificador_contribuyente = '';
    this.identificador_sucursal = '';
    this.identificador_acreedor = '';
    this.identificador_cuenta_departamento = '';
    this.nfc = '';
    this.moneda = '';
    this.fecha_factura = '';
    this.importe = '';
    this.descripcion = '';
    this.impuesto = '';
    this.forma_pago = '';
    this.total = '';
    this.archivo = '';
    this.inicio_periodo = '';
    this.fin_periodo = '';
  }
}
