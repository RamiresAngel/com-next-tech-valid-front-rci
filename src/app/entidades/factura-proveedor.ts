export class FacturaProveedor {
  ncf: string;
  fecha_factura: string;
  moneda: number;
  subtotal: number;
  total: number;
  archivo: string;
  identificador_usuario: string;
  identificador_contribuyente: string;
  identificador_sucursal: string;
  num_proveedor: string;
  nombre_proveedor: string;
  items: FacturaProveedorItem[];
  id_codigo_recepcion: number[];
  identificador_proveedor: string;
  total_impuestos: number

  constructor() {
    this.items = new Array<FacturaProveedorItem>();
    this.id_codigo_recepcion = new Array<number>();
  }
}

export class FacturaProveedorItem {
  cantidad: number;
  descripcion_material: string;
  precio: number;
  id_impuesto: number;
  monto_impuesto: number;
  importe: number;
}
