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
  /* para comprobaciones
     temporal en lo que
     se define la entidad*/
  public concepto: string;
  public numero_comprobante: string;
  public monto_reembolso: string;
  public iva: string;
  public comprobante_fiscal: number;

}



export class ComrpobacionGastosDetalleConceptos {
  public cantidad: number;
  public descripcion: string;
  public valor_unitario: number;
  public unidad: string;
  public importe: number;
  public concepto: string;
}
