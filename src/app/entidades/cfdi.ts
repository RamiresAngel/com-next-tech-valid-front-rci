import { DetalleComplementosComponent } from "../modulos/listar-cfdi/detalle-complementos/detalle-complementos.component";

export class Cfdi {
  public id: number;
  public codigo_recepcion_id: number;
  public proveedor_identificador: string;
  public sucursal_identificador: string;
  public serie: string;
  public folio: string;
  public rfc_proveedor: string;
  public nombre_proveedor: string;
  public fecha_factura: string;
  public fecha_recepcion: string;
  public subtotal: number;
  public descuento: number;
  public total_factura: number;
  public estado_recepcion: number;
  public estado_erp: number;
  public estado_sat: string;
  public version: string;
  public tipo_comprobante: string;
  public certificado_sat: string;
  public pac_certificador: string;
  public numcertificado: string;
  public fecha_certificacion: string;
  public folio_fiscal: string;
  public identificador_usuario: string;
  public moneda: string;
  public pagado: number;
  public tipo_movimiento_doc: number;
  public tipo_cambio: number;
  public lugar_expedicion: string;
  public forma_pago: string;
  public metodo_pago: string;
  public folio_sap: string;
  public estado_aprobacion: number;
  public xml: string;
  public pdf: string;
  public rechazo_negocio: number;
  public estado_sap: number;

  public receptor_nombre: string;
  public receptor_rfc: string;
  public reproceso: string;
  public sucursal: string;
  public sucursal_codigo: string;
  public total_impuestos_retenidos: string;
  public total_impuestos_traslados: string;
  public uso_cfdi: string;
  public estado_recepcion_descripcion: string;
  public estado_sap_descripcion: string;
  public relacionado: number;



  constructor() {
    this.id = 0;
    this.codigo_recepcion_id = 0;
    this.proveedor_identificador = '';
    this.sucursal_identificador = '';
    this.serie = '';
    this.folio = '';
    this.rfc_proveedor = '';
    this.nombre_proveedor = '';
    this.fecha_factura = '';
    this.fecha_recepcion = '';
    this.subtotal = 0;
    this.descuento = 0;
    this.total_factura = 0;
    this.estado_recepcion = 0;
    this.estado_erp = 0;
    this.estado_sat = '';
    this.version = '';
    this.tipo_comprobante = '';
    this.certificado_sat = '';
    this.pac_certificador = '';
    this.numcertificado = '';
    this.fecha_certificacion = '';
    this.folio_fiscal = '';
    this.identificador_usuario = '';
    this.moneda = '';
    this.pagado = 0;
    this.tipo_movimiento_doc = 0;
    this.tipo_cambio = 0;
    this.lugar_expedicion = '';
    this.forma_pago = '';
    this.metodo_pago = '';
    this.folio_sap = '';
    this.estado_aprobacion = 0;
    this.xml = '';
    this.pdf = '';
    this.rechazo_negocio = 0;
    this.estado_sap = 0;
  }
}

export class DocumentoRelacionado {
  tipo_relacion: string;
  relacion: string;
  folio_fiscal: string;
  total_factura: string;
  subtotal: string;
  constructor() {
    this.tipo_relacion = '';
    this.relacion = '';
    this.folio_fiscal = '';
    this.total_factura = '';
    this.subtotal = '';
  }
}

export class ComplementoDePago {
  id: number;
  fecha_pago: string;
  folio_fiscal: string;
  forma_Pago: string;
  moneda: string;
  monto: number;
  detalle: DetalleComplemento[];
  cosntructor() {
    this.detalle = new Array<DetalleComplemento>();
  }
}

class DetalleComplemento {
  folio_fiscal: string;
  moneda: string;
  metodo_pago: string;
  num_parcialidad: string;
  imp_saldo_ant: string;
  imp_pagado: string;
  imp_saldo_insoluto: string;
}

export class EmisorCFDI {
  rfc: string;
  nombre: string;
  regimenFiscal: string;
}
export class ReceptorCFDI {
  rfc: string;
  nombre: string;
  residenciaFiscalSpecified: boolean;
  numRegIdTrib: string;
  usoCFDI: string;
}

export class ImpuestoConceptoCFDI {
  base: number;
  impuesto: string;
  tipoFactor: string;
  tasaOCuota: string;
  tasaOCuotaSpecified: boolean;
  importe: number;
  importeSpecified: boolean;
}
export class ConceptoCFDI {
  impuestos: { traslados: ImpuestoConceptoCFDI[], retenciones: ImpuestoConceptoCFDI[] };
  informacionAduanera: any;
  cuentaPredial: any;
  complementoConcepto: any;
  parte: any;
  claveProdServ: string;
  noIdentificacion: string;
  cantidad: number;
  claveUnidad: string;
  unidad: string;
  descripcion: string;
  valorUnitario: number;
  importe: number;
  descuentoSpecified: boolean;
  descuento: number;
  aplica: boolean;
  valido: boolean;
  cuenta: string;
}

export class ComplementoCFDI {
  impuestosLocales: any;
  timbreFiscalDigital: {
    version: string;
    uuid: string;
    fechaTimbrado: string;
    rfcProvCertif: string;
    leyenda: any,
    selloCFD: string;
    noCertificadoSAT: string;
    selloSAT: string;
  };
  nomina: any;
  ine: any;
  pagos: any;
}
export class DefaultCFDI {
  cfdiRelacionados: any[];
  emisor: EmisorCFDI;
  receptor: ReceptorCFDI;
  conceptos: ConceptoCFDI[];
  impuestos: {
    retenciones: ImpuestoConceptoCFDI[]
    traslados: ImpuestoConceptoCFDI[],
    totalImpuestosRetenidos: number,
    totalImpuestosRetenidosSpecified: boolean,
    totalImpuestosTrasladados: number,
    totalImpuestosTrasladadosSpecified: boolean,
  };
  complemento: ComplementoCFDI;
  version: string;
  serie: any;
  folio: string;
  fecha: string;
  sello: string;
  formaPago: string;
  formaPagoSpecified: boolean;
  noCertificado: string;
  certificado: string;
  condicionesDePago: any;
  subTotal: number;
  descuentoSpecified: boolean;
  moneda: string;
  tipoCambioSpecified: boolean;
  total: number;
  tipoDeComprobante: string;
  metodoPago: string;
  metodoPagoSpecified: boolean;
  lugarExpedicion: string;
  confirmacion: any;
  file: string;
  xml: string;
  pdf: string;
  nacional: number;
  fecha_comprobante: string;
  forma_pago: string;
  tipo_cambio: number;
  tipoCambio: number;
  tipo_comprobante: string;
  tipo_documento_id: number;
  id_tipo_gasto: number;
  id_solicitud: number;
  identificador_corporativo: string;
  index: number;
  lista_negra: number;
  identificador_contribuyente: string;
  identificador_usuario: string;
  folio_comprobacion: number
  proveedor_identificador: string;
  numero_comprobante: string;
  observaciones: string;
  uuid: string;
  comprobante_papel: number;
}
