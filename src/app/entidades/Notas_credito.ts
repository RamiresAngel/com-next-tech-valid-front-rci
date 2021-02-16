export class NotasCredito {
  descripcion: string;
  empresa: string;
  hotel: string;
  usuario_acreedor: string;
  estatus_descripcion: string;
  estatus_sap_descripcion: string;
  fecha_contabilizacion: string;
  fecha_creacion: string;
  fecha_emision: string;
  fecha_recepcion: string;
  folio_sap: string;
  tipo_gasto: string;
  id: number;
  documento_id: number;
  usuario_identificador: string;
  aprobacion: number;
  numero_nivel: number;
  numero_niveles_aprobacion: number;
  cuenta_contable: string;
  site: string;
  pdf: string;
  xml: string;
  folio_fiscal: string;
  nombre_proveedor: string;

  constructor() {
    this.descripcion = '';
    this.empresa = '';
    this.hotel = '';
    this.usuario_acreedor = '';
    this.estatus_descripcion = '';
    this.estatus_sap_descripcion = '';
    this.fecha_contabilizacion = '';
    this.fecha_creacion = '';
    this.fecha_emision = '';
    this.fecha_recepcion = '';
    this.folio_sap = '';
    this.tipo_gasto = '';
    this.id = 0;
    this.documento_id = 0;
    this.usuario_identificador = '';
    this.nombre_proveedor = '';
  }

}
