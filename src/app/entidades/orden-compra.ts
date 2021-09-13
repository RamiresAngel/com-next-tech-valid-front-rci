import { Cfdi } from './cfdi';
import { CodigoRecepcion } from './codigo-recepcion';

export class OrdenCompra {
  public advance_ind: string;
  public amount: number;
  public anticipo_facturado: number;
  public clase_documento: number;
  public codigo_sociedad: string;
  public completado: number;
  public confirmada: number;
  public correo_anticipo: string;
  public contribuyente: string;
  public sucursal: string;
  public delete_ind: number;
  public estado: number;
  public fecha_orden: string;
  public fecha_vencimiento_anticipo: string;
  public forma_pago: string;
  public id: number;
  public identificador_contribuyente: string;
  public identificador_corporativo: string;
  public identificador_sucursal: string;
  public identificador_proveedor: string;
  public importe_anticipo: number;
  public indicador_anticipo: string;
  public items: Array<ItemOrdenCompra>;
  public codigos_recepcion: Array<ItemOrdenCompra>;
  public material_doc: string;
  public metodo_pago: string;
  public moneda: string;
  public nombre_proveedor: string;
  public num_proveedor: string;
  public numero_orden: string;
  public pdf: string;
  public proveedor_id: number;
  public ruta_pdf: string;
  public tipo_cambio: number;
  public tipo_documento: string;
  public total: number;
  public uso_cfdi: string;
  public saldos: Saldos;
  public documentos_relacionados: Cfdi[];
  public devolucion: number;
  public estatus: number;

  constructor() {
    this.advance_ind = '';
    this.amount = 0;
    this.anticipo_facturado = 0;
    this.clase_documento = 0;
    this.codigo_sociedad = '';
    this.completado = 0;
    this.confirmada = 0;
    this.correo_anticipo = '';
    this.delete_ind = 0;
    this.estado = 0;
    this.fecha_orden = '';
    this.fecha_vencimiento_anticipo = '';
    this.forma_pago = '';
    this.id = 0;
    this.identificador_contribuyente = '';
    this.identificador_corporativo = '';
    this.identificador_sucursal = '';
    this.importe_anticipo = 0;
    this.indicador_anticipo = '';
    this.items = new Array<ItemOrdenCompra>();
    this.codigos_recepcion = new Array<ItemOrdenCompra>();
    this.material_doc = '';
    this.metodo_pago = '';
    this.moneda = '';
    this.nombre_proveedor = '';
    this.num_proveedor = '';
    this.numero_orden = '';
    this.pdf = '';
    this.proveedor_id = 0;
    this.ruta_pdf = '';
    this.tipo_cambio = 0;
    this.tipo_documento = '';
    this.total = 0;
    this.uso_cfdi = '';
    this.saldos = new Saldos();
    this.documentos_relacionados = new Array<Cfdi>();
  }
}

class ItemOrdenCompra {
  public advance_ind: string;
  public amount: number;
  public borrado: number;
  public cantidad: number;
  public delete_ind: string;
  public descripcion_material: string;
  public fecha_entrega: string;
  public hotel_code: string;
  public hotel_id: number;
  public id: number;
  public material: string;
  public material_doc: string;
  public net_value: number;
  public no_more_gr: number;
  public numero_orden: string;
  public orden_compra_id: number;
  public posicion: number;
  public precio_bruto: number;
  public precio_neto: number;
  public unidad: string;
}

export class Saldos {
  monto_oc: number;
  monto_anticipo: number;
  total_montos_cr: number;
  total_montos_nc: number;
  saldo_pendiente: number;

  constructor() {
    this.monto_oc = 0;
    this.monto_anticipo = 0;
    this.total_montos_cr = 0;
    this.total_montos_nc = 0;
    this.saldo_pendiente = 0;
  }
}

export class OrdenCompraResponse {
  cfdi_id: number;
  preliminar_id: number;
  pdf: string;
  xml: string;
  identificador_corporativo: string;
  identificador_sucursal: string;
  identificador_proveedor: string;
  identificador_usuario: string;
  tipo_movimiento: number;
  numero_orden: string;
  identificador_contribuyente: string;
  orden_compra: OrdenCompra;
  ordenes_compra: Array<OrdenCompra>;
  codigos_recepcion: CodigoRecepcion[];
  saldos: Saldos;
  tipo_documento: string;
  multiple: number;
  lista_negra: number;
  documentos_relacionados: any[];

  constructor() {
    this.orden_compra = new OrdenCompra();
    this.ordenes_compra = new Array<OrdenCompra>();
    this.codigos_recepcion = new Array<CodigoRecepcion>();
    this.saldos = new Saldos();
    this.documentos_relacionados = new Array<any>();
  }

}

export class OrdenCompraRD {
  advance_ind: string;
  amount: number;
  anticipo_facturado: false
  clase_documento: number;
  codigo_sociedad: string;
  codigos_recepcion: CodigoRecepcionRD[]
  completado: false
  confirmada: false
  correo_anticipo: null
  delete_ind: number;
  devolucion: number;
  estado: number;
  fecha_actualizacion: null
  fecha_creacion: string;
  fecha_orden: string;
  fecha_vencimiento_anticipo: null
  forma_pago: string;
  id: number;
  identificador_contribuyente: string;
  identificador_corporativo: string;
  identificador_sucursal: string;
  importe_anticipo: number;
  indicador_anticipo: string;
  material_doc: string;
  metodo_pago: string;
  moneda: string;
  nombre_proveedor: string;
  num_proveedor: string;
  numero_orden: string;
  pdf: string;
  proveedor_id: number;
  ruta_pdf: string;
  tipo_cambio: number;
  tipo_documento: string;
  total: number;
  uso_cfdi: string;

  constructor() {
    this.advance_ind = '';
    this.amount = 0;
    this.anticipo_facturado = false;
    this.clase_documento = 0;
    this.codigo_sociedad = '';
    this.codigos_recepcion = new Array<CodigoRecepcionRD>();
    this.completado = false;
    this.confirmada = false;
    this.delete_ind = 0;
    this.devolucion = 0;
    this.estado = 0;
    this.fecha_creacion = '';
    this.fecha_orden = '';
    this.forma_pago = '';
    this.id = 0;
    this.identificador_contribuyente = '';
    this.identificador_corporativo = '';
    this.identificador_sucursal = '';
    this.importe_anticipo = 0;
    this.indicador_anticipo = '';
    this.material_doc = '';
    this.metodo_pago = '';
    this.moneda = '';
    this.nombre_proveedor = '';
    this.num_proveedor = '';
    this.numero_orden = '';
    this.pdf = '';
    this.proveedor_id = 0;
    this.ruta_pdf = '';
    this.tipo_cambio = 0;
    this.tipo_documento = '';
    this.total = 0;
    this.uso_cfdi = '';

  }

}

export class CodigoRecepcionRD {
  id: number;
  codigo_recepcion: string;
  fecha_documento: string;
  fecha_contable: string;
  nota_entrega: string;
  activo: number;
  ruta_pdf: string;
  numero_orden_compra: string;
  facturado: number;
  movimiento: number;
  monto: number;
  documento_cfdi_id: number;
  orden_compra_id: number;
}
