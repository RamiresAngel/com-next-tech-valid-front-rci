export class CodigoRecepcion {
  public activo: number;
  public codigo_recepcion: string;
  public codigo_recepcion_items: Array<ItemCodigoRecepcion>;
  public documento_cfdi_id: number;
  public facturado: number;
  public fecha_contable: string;
  public fecha_documento: string;
  public folio_fiscal: string;
  public id: number;
  public monto: number;
  public movimiento: number;
  public nota_entrega: string;
  public numero_orden_compra: string;
  public orden_compra_id: number;
  public pdf: string;
  public ruta_pdf: string;
  public contribuyente: string;
  public sucursal: string;
  public moneda: string;
  public identificador_corporativo: string;

  constructor() {
    this.activo = 0;
    this.codigo_recepcion = '';
    this.codigo_recepcion_items = new Array<ItemCodigoRecepcion>();
    this.documento_cfdi_id = 0;
    this.facturado = 0;
    this.fecha_contable = '';
    this.fecha_documento = '';
    this.folio_fiscal = '';
    this.id = 0;
    this.monto = 0;
    this.movimiento = 0;
    this.nota_entrega = '';
    this.numero_orden_compra = '';
    this.orden_compra_id = 0;
    this.pdf = '';
    this.ruta_pdf = '';
    this.contribuyente = '';
    this.sucursal = '';
    this.moneda = '';
  }
}

export class ItemCodigoRecepcion {
  public cantidad_doc: number;
  public cantidad_em: number;
  public codigo_recepcion_id: number;
  public id: number;
  public material: string;
  public movimiento: number;
  public num_orden_compra: string;
  public orden_compra_id: number;
  public posicion: number;
  public cantidad: number;
  public descripcion_material: string;
  public precio: number;
  public id_impuesto: number;
  public monto_impuesto: number;
  public importe: number;
  public identificador_header: string;
  public descripcion_tipo: string;
  public tasa: number;
  public tipo_retencion_id: number;
  public local: number;
}
