import { CodigoRecepcion } from './codigo-recepcion';
import { OrdenCompra, Saldos } from './orden-compra';
import { Cfdi } from './cfdi';

export class CargaDocumentoOC {
  pdf: string;
  xml: string;
  identificador_proveedor: string;
  identificador_sucursal: string;
  numero_orden: string;
  identificador_corporativo: string;
  codigos_recepcion: CodigoRecepcion[];
  tipo_movimiento: number;
  orden_compra: OrdenCompra;
  cfdi_id: number;
  saldos: Saldos;
  lista_negra: number;
  documentos_relacionados: Cfdi[];
  tipo_dcoumento: number;


  constructor() {
    this.codigos_recepcion = new Array<CodigoRecepcion>();
    this.tipo_movimiento = 0;
    this.pdf = '';
    this.documentos_relacionados = new Array<Cfdi>();
    // this.saldos = new Saldos();
    // this.orden_compra = new OrdenCompra();
  }
}
