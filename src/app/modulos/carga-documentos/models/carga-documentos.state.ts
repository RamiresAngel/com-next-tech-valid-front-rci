import { ConceptoCargaDocumentos } from './index';
export class CargaDocumento {
  folio_fiscal: string;
  fecha_factura: string;
  moneda: string;
  subtotal: number;
  total_factura: number;
  pdf: string;
  identificador_usuario: string;
  identificador_contribuyente: string;
  sucursal_identificador: string;
  num_proveedor: string;
  nombre_proveedor: string;
  items: ConceptoCargaDocumentos[];
  id_codigo_recepcion: number[];
  proveedor_identificador: string;
  total_impuestos: number;
  tipo_movimiento_doc: number;

  constructor() {
    this.folio_fiscal = '';
    this.fecha_factura = '';
    this.moneda = '';
    this.subtotal = 0;
    this.total_factura = 0;
    this.pdf = '';
    this.identificador_usuario = '';
    this.identificador_contribuyente = '';
    this.sucursal_identificador = '';
    this.num_proveedor = '';
    this.nombre_proveedor = '';
    this.items = new Array<ConceptoCargaDocumentos>();
    this.id_codigo_recepcion = new Array<number>();
    this.proveedor_identificador = '';
    this.total_impuestos = 0;
    this.tipo_movimiento_doc = 0;
  }
}
