export class FiltroCFDI {
  identificador_corporativo: string;
  fecha_inicio_recepcion: string;
  fecha_fin_recepcion: string;
  fecha_inicio_doc: string;
  fecha_fin_doc: string;
  serie: string;
  folio_fiscal: string;
  nombre_proveedor: string;
  rfc_proveedor: string;
  sucursal_identificador: string;
  identificador_contribuyente: string;
  codigo_recepcion: string;
  listtype: string;
  tipo_movimiento_doc: number;
  orden_compra: string;
  identificador_lote: string;

  constructor() {
    // this.identificador_contribuyente = '';
    this.identificador_corporativo = '';
    this.fecha_inicio_recepcion = '';
    this.fecha_fin_recepcion = '';
    this.fecha_inicio_doc = '';
    this.fecha_fin_doc = '';
    this.serie = '';
    this.folio_fiscal = '';
    // this.numero_oc = '';
    this.orden_compra = '';
    // this.numero_SAP = '';
    this.nombre_proveedor = '';
    this.rfc_proveedor = '';
    this.sucursal_identificador = '';
    this.identificador_contribuyente = '';
    this.codigo_recepcion = '';
    this.tipo_movimiento_doc = 0;
    this.listtype = 'list';
    this.identificador_lote = '';
  }
}

export class FiltroCFDICS {
  identificador_corporativo: string;
  fecha_inicio_recepcion: string;
  fecha_fin_recepcion: string;
  fecha_inicio_doc: string;
  fecha_fin_doc: string;
  serie: string;
  nombre_proveedor: string;
  rfc_proveedor: string;
  sucursal_identificador: string;
  folio_fiscal: string;
  tipo_gasto: number;
  identificador_departamento: string;
  identificador_contribuyente: string;
  identificador_lote: string;
  tipo_comprobante: string;
  listtype: string;

  constructor() {
    this.identificador_corporativo = '';
    this.fecha_inicio_recepcion = '';
    this.fecha_fin_recepcion = '';
    this.fecha_inicio_doc = '';
    this.fecha_fin_doc = '';
    this.serie = '';
    this.nombre_proveedor = '';
    this.rfc_proveedor = '';
    this.sucursal_identificador = '';
    this.folio_fiscal = '';
    this.tipo_gasto = 0;
    this.identificador_departamento = '';
    this.identificador_contribuyente = '';
    this.identificador_lote = '';
    this.tipo_comprobante = '';
    this.listtype = '';
  }
}

export class FiltroCfdiRD {

  identificador_corporativo: string;
  identificador_contribuyente: string;
  sucursal_identificador: string;
  tipo_documento: string;
  orden_compra: string;
  fecha_inicio_recepcion: string;
  fecha_fin_recepcion: string;
  fecha_inicio_doc: string;
  fecha_fin_doc: string;
  nombre_proveedor: string;
  rfc_proveedor: string;
  ncf: string;
  folio_fiscal: string;
  listtype: string;

  constructor() {
    this.identificador_corporativo = '';
    this.identificador_contribuyente = '';
    this.sucursal_identificador = '';
    this.tipo_documento = '';
    this.orden_compra = '';
    this.fecha_inicio_recepcion = '';
    this.fecha_fin_recepcion = '';
    this.fecha_inicio_doc = '';
    this.fecha_fin_doc = '';
    this.nombre_proveedor = '';
    this.rfc_proveedor = '';
    this.ncf = '';
    this.folio_fiscal = '';
    this.listtype = '';
  }
}
