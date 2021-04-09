import { ConceptoComprobanteRCI } from "./ComprobanteNacional";

export class ComprobacionGastosDetalle {
  public tipo_comprobante: string;
  public origen: string;
  public fecha: string;
  public rfc_emisor: string;
  public razon_social_emisor: string;
  public folio_fiscal: string;
  public forma_pago: string;
  public moneda: string;
  public subtotal: string;
  public tasa_impuesto: string;
  public total_impuesto: string;
  public otros_impuestos: string;
  public total: string;
  public observaciones: string;
  public pdf: string;
  public xml: string;
  public concepto: string;
  public numero_comprobante: string;
  public monto_reembolso: string;
  public iva: string;
  public comprobante_fiscal: number;
  public descripcion_cuenta: string;
  public estatus: string;
  public fecha_comprobante: string;
  public folio_comprobacion: number;
  public guardar: number;
  public id_cuenta_agrupacion: number;
  public id_moneda: number;
  public id_solicitud: number;
  public id_tipo_gasto: number;
  public identificador_contribuyente: string;
  public identificador_departamento: string;
  public identificador_proveedor: string;
  public identificador_sucursal: string;
  public identificador_usuario: string;
  public index: number;
  public lista_negra: number;
  public monto_reembolsar: number;
  public monto_solicitud: number;
  public nacional: number;
  public preliminar_id: number;
  public prorrateo: number;
  public razon_social: string;
  public tipo_cambio: number;
  public tipo_documento_id: number;
  public tipo_movimiento: number;
  public conceptos: ConceptoComprobanteRCI[];
}
export class ComrpobacionGastosDetalleConceptos {
  public cantidad: number;
  public descripcion: string;
  public valor_unitario: number;
  public unidad: string;
  public importe: number;
  public concepto: string;
}

export class ComprobancionConcepto {
  claveProdServ: string;
  claveUnidad: string;
  unidad: string;
  concepto: string;
  observacion: string;
  cuenta: string;
  aplica: number;
  cantidad: number;
  comprobante_fiscal: number;
  descripcion: number;
  descuento: number;
  id: number;
  id_cuenta_agrupacion: number;
  importe: number;
  monto_rembolsar: number;
  pagado_compania: number;
  valorUnitario: number;
}
