export class FiltroSolicitudes2 {
  draw: Number;
  length: Number;
  start: Number;
  search: Search;
  // // filt: Filt;
  // order: [];
  // columns: Dir[];

  constructor() {
    this.draw = 1;
    this.length = 10;
    this.start = 0;
    this.search = new Search();
    // // this.filt = new Filt();
    // this.order = [];
    // this.columns = [new Dir()];

  }
}

class Search {
  value: string;

  constructor() {
    this.value = '';
  }
}
export class FiltroSolicitudes {
  contributente_identificador: string;
  sucursal_identificador: string;
  numero_anticipo_sap: string;
  numero_factura_sap: string;
  numero_orden_compra: string;
  codigo_recepcion: string;
  fecha_inicio_recepcion: string;
  fecha_inicio_doc: string;
  serie: string;
  folio: string;
  rfc_proveedor: string;
  nombre_proveedor: string;
  usuario_identificador: string;
  aprobador: Number;
  fecha_fin_recepcion: string;
  folio_sap: string;
  tipo_movimiento_doc: string;
  fecha_fin_doc: string;
  fecha_inicio_viaje: string;
  fecha_inicio: string;
  fecha_fin_viaje: string;
  fecha_fin: string;
  estatus_sap: Number;
  estatus: Number;
  destino: string;
  folio_fiscal: string;
  numero_proveedor: string;
  listtype: string;
  codigo_contribuyente: string;
  anticipo: number;
  start: number;
  identificador_contribuyente: string;
  identificador_corporativo: String;


  constructor() {
    // this.contributente_identificador = '';
    // this.sucursal_identificador = '';
    // this.numero_anticipo_sap = '';
    this.numero_factura_sap = '';
    // this.numero_orden_compra = '';
    // this.codigo_recepcion = '';
    // this.fecha_inicio_recepcion = '';
    // this.fecha_inicio_doc = '';
    // this.serie = '';
    // this.folio = '';
    // this.rfc_proveedor = '';
    // this.nombre_proveedor = '';
    // this.usuario_identificador = '';
    // this.aprobador = 0;
    // this.fecha_fin_recepcion = '';
    // this.folio_sap = '';
    // this.tipo_movimiento_doc = '';
    // this.fecha_fin_doc = '';
    // this.fecha_inicio_viaje = '';
    this.fecha_inicio = '';
    // this.fecha_fin_viaje = '';
    this.fecha_fin = '';
    this.start = 1;



    // this.estatus_sap = 0;
    this.estatus = 1;
    // this.destino = '';


    this.folio_fiscal = '';
    this.numero_proveedor = '';


    // this.listtype = 'list';
    // this.codigo_contribuyente = '';
    // this.anticipo = 0;
    // this.identificador_contribuyente = '';
    // this.identificador_corporativo = '';
  }
}

class Dir {
  dir: string;
  constructor() {
    this.dir = 'asc';
  }
}


export class filtroComprobacion {
  contributente_identificador: string;
  sucursal_identificador: string;
  numero_factura_sap: string;
  fecha_inicio: string;
  fecha_fin: string;
  estatus_sap: number;
  estatus: number;
  identificador_corporativo: string;
  usuario_identificador: string;
  aprobador: number;
  nombre_proveedor: string;
  tipo_gasto: number;
  listtype: string;
}

