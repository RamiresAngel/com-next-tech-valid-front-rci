export class SolicitudAnticipoGastoViaje {
  descripcion: string;
  contributente_identificador: string;
  sucursal_identificador: string;
  monto: Number;
  monto_aprox: Number;
  file: Array<string>;
  usuario_identificador: string;
  id_moneda: Number;
  fecha_inicio_viaje: string;
  fecha_fin_viaje: string;
  destino: string;
  referencia: string;
  identificador_departamento: string;
  identificador_centro_consumo: string;
  motivo: string;
  id: Number;
  numero_anticipo_sap: null;
  contabilizado: 0;
  cubierto: 0;
  fecha_creacion: string;
  fecha_reembolso: string;
  fecha_devuelto: string;
  monto_reembolsado: Number;
  monto_devuelto: Number;
  tipo_gasto_id: Number;
  activo: Number;
  autorizado: Number;
  estatus_sap: Number;
  user_autorizo: string;
  user_contabilizo: string;
  fecha_autorizo: string;
  fecha_contabilizo: string;
  estatus: Number;
  autorizar_devolucion: Number;
  estatus_autizo_devolucion: Number;
  fecha_autorizo_devolucion: string;
  fecha_contabilizo_devolucion: string;
  fecha_autorizo_reembolso: string;
  fecha_contabilizo_reembolso: string;
  numero_proveedor: string;
  incode: string;
  codigo_contribuyente: string;
  nombre_contribuyente: string;
  codigo_erp: string;
  nombre_sucursal: string;
  ceco: string;
  codigo_cc: string;
  clave_departamento: string;
  descripcion_departamento: string;
  tipo_gasto: string;
  estatus_descripcion: string;
  identificador_corporativo: string;
  codigo_moneda: string;
  contabilizar_devolucion: Number;
  estatus_contabilizo_devolucion: Number;
  autorizo_reembolso: Number;
  estatus_autorizo_reembolso: Number;
  contabilizo_reembolso: Number;
  estatus_contabilizo_reembolso: Number;
  editando: Number;
  id_caja_chica: Number;
  anticipo: Number;
  preliminar_id: Number;
  estatus_preliminar: Number;
  estatus_aprobacion: Number;
  id_cuenta_agrupacion_gasto_viaje: Number;
  constructor() {
    this.monto = 0;
    this.file = new Array<string>();
  }
}

export class AprobacionRequest {
  id_solicitud: Number;
  tipo_gasto: Number;
  identificador_aprobador: string;
  comentario_rechazo: string;
  comentario_aprobacion: string;
  comentario: string;
  documento_id: number
  reiniciar: number
  tipo_documento: number
  agrupar: boolean;
  constructor() {
    this.identificador_aprobador = '';
    this.comentario_rechazo = '';
  }
}
