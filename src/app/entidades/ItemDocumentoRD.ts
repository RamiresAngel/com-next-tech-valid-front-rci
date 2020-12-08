export class ItemDocumentoRD {
  id: number;
  cantidad: number;
  concepto: string;
  importe: number;
  monto_impuesto: number;
  valor_unitario: number;
  identificador_header: string;
  impuestos: ImpuestoItemDocumentoRD[];
  impuestos_seleccionado: number;
  clave_prod_serv: string;
  descuento: number;
  cantida_doc: number;
  cantidad_em: number;
  codigo_recepcion_id: number;
  descripcion_material: string;
  hoja_entrada_serv: null
  material: string;
  movimiento: number;
  num_orden_compra: string;
  orden_compra_id: number;
  posicion: number;
  precio: number;

  constructor() {
    this.impuestos = new Array<ImpuestoItemDocumentoRD>();
    this.concepto = '';
    this.importe = 0;
    this.monto_impuesto = 0;
    this.valor_unitario = 0;
    this.identificador_header = '';
    this.impuestos_seleccionado = 0;
    this.impuestos_seleccionado = 0;
    this.clave_prod_serv = '';
    this.descuento = 0;
  }
}

export class ImpuestoItemDocumentoRD {
  id: number;
  bufer_factura_detail_id: number;
  clave: string;
  tasa: number;
  importe: number;
  impuesto_id: number;
  local: number;
  descripcion: string;
  identificador_corporativo: string;

  constructor() {
    this.id = 0;
    this.bufer_factura_detail_id = 0;
    this.clave = '';
    this.tasa = 0;
    this.importe = 0;
    this.impuesto_id = 0;
    this.local = 0;

  }
}
