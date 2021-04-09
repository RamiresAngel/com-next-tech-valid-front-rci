export class ComprobacionBandejaAprobacion {
  id: string;
  tipo_gasto: string;
  id_moneda: string;
  recuperable: string;
  folio_comprobacion: string;
  estatus_id: string;
  identificador_usuario: string;
  nombre_usuario: string;
  identificador_compania: string;
  nombre_compania: string;
  identificador_cc: string;
  nombre_cc: string;
  identificador_aprobador: string;
  nombre_usuario_aprobador: string;
  nombre_moneda: string;
  monto_reembolsar: string;
  descripcion: string;
  motivo: string;
  fecha_creacion: string;
  estatus: string;
  nivel_aprobacion: number;
}

export class FiltroComprobacionBandejaAprobacion {
  estatus: number;
  folio_comprobacion: number;
  tipo_gasto: number;
  fecha_fin: string;
  fecha_inicio: string;
  identificador_cc: string;
  identificador_contribuyente: string;
  identificador_corporativo: string;
  identificador_aprobador: string;
  identificador_usuario: string;
  constructor() {
    this.estatus = 0;
    this.folio_comprobacion = 0;
    this.tipo_gasto = 0;
    this.fecha_fin = '';
    this.fecha_inicio = '';
    this.identificador_cc = '';
    this.identificador_contribuyente = '';
    this.identificador_corporativo = '';
    this.identificador_aprobador = '';
  }
}
