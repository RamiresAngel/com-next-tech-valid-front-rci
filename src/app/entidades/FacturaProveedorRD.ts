import { ItemCodigoRecepcion } from "./codigo-recepcion";
import { ConceptoCargaDocumentos } from "../modulos/carga-documentos/models";

export class FacturaProveedorRD {

  folio_fiscal: string;
  fecha_factura: string;
  moneda: string;
  pdf: string;
  identificador_usuario: string;
  identificador_contribuyente: string;
  sucursal_identificador: string;
  num_proveedor: string;
  nombre_proveedor: string;
  items: ConceptoCargaDocumentos[];
  id_codigo_recepcion: Number[];
  proveedor_identificador: string;
  nfc: string;
  total_impuestos: number;
  tipo_movimiento_doc: number;
  subtotal: number;
  total_factura: number;
  condicion_pago: string;

  constructor() {
    this.items = new Array<ConceptoCargaDocumentos>();
    this.id_codigo_recepcion = new Array<number>();
  }
}

export class FacturaProveedorRDItem {
  cantidad: number;
  descripcion_material: string;
  precio: number;
  id_impuesto: number;
  monto_impuesto: number;
  importe: number;
}
