export class HeaderGastosRD {
  id: number;
  proveedor_identificador: string;
  sucursal_identificador: string;
  rfc_proveedor: string;
  nombre_proveedor: string;
  fecha_factura: string;
  fecha_recepcion: string;
  subtotal: number;
  total_factura: number;
  tipo_comprobante: string;
  folio_fiscal: string;
  identificador_usuario: string;
  descuento: number;
  moneda: string;
  metodo_pago: string;
  tipo_movimiento_doc: number;
  forma_pago: string;
  total_impuestos: number;
  tipo_cambio: number;
  reproceso_nc: number;
  identificador_contribuyente: string;
  extranjero: number;
  tipo_gasto: number;
  prorrateo: number;
  identificador: string;
  numero_orden: string;
  descripcion: string;
  identificador_cuenta: string;
  fecha_inicio_periodo: string;
  fecha_fin_periodo: string;
  pais: string;
  ciudad: string;
  municipio: string;
  calle: string;
  codigo_postal: string;
  condicion_pago: string;
  pdf: string;
  numero_proveedor: string;
  id_cuenta_agrupacion: number;
  cuentas_prorrateo: CuentaProrrateo[]

  constructor() {
    this.proveedor_identificador = '';
    this.sucursal_identificador = '';
    this.rfc_proveedor = '';
    this.nombre_proveedor = '';
    this.fecha_factura = '';
    this.fecha_recepcion = '';
    this.subtotal = 0;
    this.total_factura = 0;
    this.tipo_comprobante = '';
    this.folio_fiscal = '';
    this.identificador_usuario = '';
    this.descuento = 0;
    this.moneda = '';
    this.metodo_pago = '';
    this.tipo_movimiento_doc = 0;
    this.forma_pago = '';
    this.total_impuestos = 0;
    this.tipo_cambio = 0;
    this.reproceso_nc = 0;
    this.identificador_contribuyente = '';
    this.extranjero = 0;
    this.tipo_gasto = 0;
    this.prorrateo = 0;
    this.identificador = '';
    this.numero_orden = '';
    this.descripcion = '';
    this.identificador_cuenta = '';
    this.fecha_inicio_periodo = '';
    this.fecha_fin_periodo = '';
    this.pais = '';
    this.ciudad = '';
    this.municipio = '';
    this.calle = '';
    this.codigo_postal = '';
    this.pdf = '';
    this.condicion_pago = '';
    this.cuentas_prorrateo = new Array<CuentaProrrateo>();
  }
}

export class CuentaProrrateo {
  id: number;
  identificador_header: string;
  id_cuenta_agrupacion: number;
  ceco: string;
  importe_asignado: number;
  porcentaje_asignado: number;
  identificador_cuenta: string;
  cuenta: string;
  cuenta_codigo: string;
  departamento: string;
}


export class DetailsDocumentoGastosRD {
  id: number;
  cantidad: number;
  concepto: string;
  importe: number;
  valor_unitario: number;
  clave_prod_serv: string;
  descuento: number;
  identificador_header: string;
  impuestos: ImpuestoDetailDocumentoGastosRD[];
}

export class ImpuestoDetailDocumentoGastosRD {
  id: number;
  bufer_factura_detail_id: number;
  clave: string;
  tasa: number;
  importe: number;
  impuesto_id: number;
  local: number;
}
