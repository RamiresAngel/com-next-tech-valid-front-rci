export class ComprobanteRCI {

  descripcion: string;
  folio_comprobacion: number;
  id: number;
  id_moneda: number;
  identificador_aprobador: string;
  identificador_cc: string;
  identificador_compania: string;
  identificador_usuario: string;
  monto_reembolsar: number;
  motivo: string;
  nombre_cc: string;
  nombre_compania: string;
  nombre_moneda: string;
  nombre_usuario: string;
  nombre_usuario_aprobador: string;
  recuperable: number;
  tipo_gasto: number;
  total_gastado: number;

  conceptos: ConceptoComprobanteRCI[];
  tarjeta_corporativa: number
  xml: string;
  file: string;
  nacional: number;
  fecha_comprobante: string;
  forma_pago: string;
  moneda: string;
  tipo_cambio: number
  tipo_comprobante: string;
  total: number;
  descripcion_cuenta: string;
  tipo_documento_id: number;
  id_tipo_gasto: number;
  id_solicitud: number;
  identificador_contribuyente: string;
  identificador_corporativo: string;
  identificador_departamento: string;
  identificador_sucursal: string;
  index: number
  lista_negra: number;
  numero_comprobante: string;
  sucursal_identificador: string;
  fecha_comprobante_seleccionada: string;
  identificador_proveedor: string;
  pagado_compania: number;
  uuid: string;
  rfc_proveedor: string;
  /* Elementos provisionales para la tabla de comprobaciones faltantes */
  estatus: string;
  razon_social: string;
  concepto_gasto: string;
  pdf: string;

  cuenta_contable: string;
  guardar: string;
  id_cuenta_agrupacion: string;
  observaciones: string;
  monto_solicitud: string;
  preliminar_id: number;
  preliminar_detalle_id: number;
  documento_cfdi_id: number;
  prorrateo: string;

  constructor() {
    this.conceptos = new Array<ConceptoComprobanteRCI>();
    this.xml = '';
    this.file = '';
    this.fecha_comprobante = '';
    this.forma_pago = '';
    this.moneda = '';
    this.tipo_comprobante = '';
    this.descripcion = '';
    this.identificador_contribuyente = '';
    this.identificador_corporativo = '';
    this.identificador_departamento = '';
    this.identificador_usuario = '';
    this.identificador_sucursal = '';
    this.numero_comprobante = '';
    this.sucursal_identificador = '';
    this.fecha_comprobante_seleccionada = '';
    this.identificador_proveedor = '';
    this.observaciones = '';
    this.uuid = '';
    this.estatus = '';
    /* Elementos provisionales para la tabla de comprobaciones faltantes */
    this.razon_social = '';
    this.concepto_gasto = '';
    this.pdf = '';
  }
}

export class ConceptoComprobanteRCI {
  impuestos: ImpuestoComprobanteRCI;
  informacionAduanera: any;
  cuentaPredial: any;
  complementoConcepto: any;
  parte: any;
  claveProdServ: string;
  noIdentificacion: any;
  cantidad: number;
  claveUnidad: string;
  unidad: string;
  descripcion: string;
  valorUnitario: number;
  importe: number;
  descuento: number
  descuentoSpecified: boolean;
  anticipo: boolean;
  total: number;
  id_cuenta_agrupacion: number;
  id: number;
  concepto: string;
  monto: number;
  valido: boolean;
  aplica: number;
  comprobante_fiscal: number;
  observacion: string;
  uuid: string;
  fecha_comprobante: string;
  pagado_compania: number;
  tipo_cambio: number;
  fecha_comprobante_seleccionada: string;
  montoRembolsar: number;
  monto_rembolsar: number;
  checked: boolean;

  constructor() {
    this.impuestos = new ImpuestoComprobanteRCI();
    this.informacionAduanera = null;
    this.cuentaPredial = null;
    this.complementoConcepto = null;
    this.parte = null;
    this.claveProdServ = '';
    this.noIdentificacion = null;
    this.claveUnidad = '';
    this.unidad = '';
    this.descripcion = '';
    this.concepto = '';
    this.uuid = '';
    this.fecha_comprobante = '';
    this.fecha_comprobante_seleccionada = '';
    this.aplica = 0;
    this.comprobante_fiscal = 0;
  }
}

export class ImpuestoComprobanteRCI {
  traslados: {
    base: number
    impuesto: string,
    tipoFactor: string,
    tasaOCuota: string,
    tasaOCuotaSpecified: true,
    importe: number
    importeSpecified: true
  }[];
  retenciones: any
}
