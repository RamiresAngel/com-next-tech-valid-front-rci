export class NotasCredito {
  descripcion: string;
  empresa: string;
  hotel: string;
  usuario_acreedor: string;
  estatus_descripcion: string;
  estatus_sap_descripcion: string;
  fecha_contabilizacion: string;
  fecha_creacion: string;
  folio_sap: string;
  tipo_gasto: string;
  id: number;
  documento_id: number;
  usuario_identificador: string;
  aprobacion: number;
  numero_nivel: number;
  numero_niveles_aprobacion: number;

  constructor() {
    this.descripcion = '';
    this.empresa = '';
    this.hotel = '';
    this.usuario_acreedor = '';
    this.estatus_descripcion = '';
    this.estatus_sap_descripcion = '';
    this.fecha_contabilizacion = '';
    this.fecha_creacion = '';
    this.folio_sap = '';
    this.tipo_gasto = '';
    this.id = 0;
    this.documento_id = 0;
    this.usuario_identificador = '';
  }

}
