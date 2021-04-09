export class ValidacionFactura {
  sucursal: string;
  serie: string;
  folio: string;
  rfc_proveedor: string;
  nombre_proveedor: string;
  fecha_factura: String;
  fecha_recepcion: String;
  subtotal: number;
  total_factura: number;
  tipo_comprobante: string;
  folio_fiscal: string;
  tipo_movimiento_doc: number;
  reproceso: number;
  detalle_validaciones: Validacion[];
  constructor() {
    // this.sucursal = '';
    // this.serie = '';
    // this.folio = '';
    // this.rfc_proveedor = '';
    // this.nombre_proveedor = '';
    // this.fecha_factura = '';
    // this.fecha_recepcion = '';
    // this.subtotal = 0;
    // this.total_factura = 0;
    // this.tipo_comprobante = '';
    // this.folio_fiscal = '';
    // this.tipo_movimiento_doc = 0;
    // this.detalle_validaciones = new Array<Validacion>();

  }
}
export class Validacion {
  id: number;
  tipo_validacion: string;
  detalle_validacion: string;
  documento_cfdi_id: number;
  valido: number;
}
