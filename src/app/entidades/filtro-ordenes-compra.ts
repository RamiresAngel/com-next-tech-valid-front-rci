export class FiltroOrdenesCompra {
  numero_proveedor: string;
  nombre_proveedor: string;
  codigo_contribuyente: string;
  identificador_contribuyente: string;
  fecha_inicio: string;
  fecha_fin: string;
  estatus_sap: Number;
  anticipo: Number;
  numero_orden_compra: string;
  identificador_corporativo: string;
  listtype: string;
  sucursal_identificador: string;

  constructor() {
    this.numero_proveedor = '';
    this.nombre_proveedor = '';
    this.codigo_contribuyente = '';
    this.identificador_contribuyente = '';
    this.fecha_inicio = '';
    this.fecha_fin = '';
    this.estatus_sap = 0;
    this.anticipo = 2;
    this.numero_orden_compra = '';
    this.identificador_corporativo = '';
    this.listtype = '';
    this.sucursal_identificador = '';
  }
}
