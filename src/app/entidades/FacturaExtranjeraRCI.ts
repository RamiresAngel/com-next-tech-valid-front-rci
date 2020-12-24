import { CodigoRecepcion } from 'src/app/entidades';


export class FacturaExtranjeraRCI {
  tipo_comprobante: string;
  file: string;
  fecha_comprobante: string;
  numero_comprobante: string;
  forma_pago: string;
  moneda: string;
  tipo_cambio: number;
  conceptos: ConceptoFacturaExtranjeraRCI[];
  total: number;
  sucursal_identificador: string;
  identificador_usuario: string;
  identificador_contribuyente: string;
  identificador_corporativo: string;
  identificador_departamento: string;
  descripcion: string;
  id_moneda: number;
  identificador_proveedor: string;
  rfc_proveedor: string;
  nombre_proveedor: string;
  numero_orden: string;
  saldos: string;
  orden_compra: string;
  codigos_recepcion: CodigoRecepcion[];
  tipo_movimiento: number;
  tipo_dcoumento: number;

  constructor() {
    this.tipo_comprobante = '';
    this.file = '';
    this.fecha_comprobante = '';
    this.numero_comprobante = '';
    this.forma_pago = '';
    this.moneda = '';
    this.tipo_cambio = 1;
    this.conceptos = new Array<ConceptoFacturaExtranjeraRCI>();
    this.total = 0;
    this.sucursal_identificador = '';
    this.identificador_usuario = '';
    this.identificador_contribuyente = '';
    this.identificador_corporativo = '';
    this.identificador_departamento = '';
    this.descripcion = '';
    this.identificador_proveedor = '';
    this.rfc_proveedor = '';
    this.nombre_proveedor = '';
    this.numero_orden = '';
    this.saldos = '';
    this.orden_compra = '';
    this.codigos_recepcion = new Array<CodigoRecepcion>();
  }
}


export class ConceptoFacturaExtranjeraRCI {
  cantidad: number
  concepto: string;
  unidad: string;
  monto: number;
}
