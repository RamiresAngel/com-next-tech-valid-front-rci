export class Comprobacion {
  public activo: number;
  public autorizado: number;
  public autorizar_devolucion: number;
  public autorizo_reembolso: number;
  public ceco: string;
  public clave_departamento: string;
  public codigo_cc: string;
  public codigo_contribuyente: string;
  public codigo_erp: string;
  public codigo_moneda: string;
  public comentario_rechazo: string;
  public contabilizado: number;
  public contabilizar_devolucion: number;
  public contabilizo_reembolso: number;
  public contributente_identificador: string;
  public cubierto: number;
  public descripcion: string;
  public descripcion_departamento: string;
  public destino: string;
  public editando: number;
  public empresa: string;
  public estatus: number;
  public estatus_autizo_devolucion: number;
  public estatus_autorizo_reembolso: number;
  public estatus_contabilizo_devolucion: number;
  public estatus_contabilizo_reembolso: number;
  public estatus_descripcion: string;
  public estatus_devolucion_reembolso: string;
  public estatus_sap: number;
  public estatus_sap_descripcion: string;
  public fecha_autorizo_devolucion: string;
  public fecha_autorizo_reembolso: string;
  public fecha_contabilizo: string;
  public fecha_contabilizo_devolucion: string;
  public fecha_contabilizo_reembolso: string;
  public fecha_creacion: string;
  public fecha_devuelto: string;
  public fecha_fin_viaje: string;
  public fecha_inicio_viaje: string;
  public fecha_reembolso: string;
  public fechaautorizo: string;
  public file: string;
  public hotel: string;
  public id: number;
  public id_caja_chica: number;
  public id_moneda: number;
  public identificador: string;
  public identificador_centro_consumo: string;
  public identificador_departamento: string;
  public incode: string;
  public mensaje_sap: string;
  public monto: number;
  public monto_devuelto: number;
  public monto_reembolsado: number;
  public no_libro_caja: string;
  public nombre_contribuyente: string;
  public nombre_solicitante: string;
  public nombre_sucursal: string;
  public numero_anticipo_sap: string;
  public numero_proveedor: string;
  public numero_sap_devolucion: string;
  public referencia: string;
  public sucursal_identificador: string;
  public tipo_gasto_id: number;
  public url_file_pdf: string;
  public url_file_pdf_devolucion: string;
  public user_autorizo: string;
  public user_autorizo_devolucion: string;
  public user_autorizo_reembolso: string;
  public user_contabilizo: string;
  public user_contabilizo_devolucion: string;
  public user_contabilizo_reembolso: string;
  public usuario_identificador: string;
  public corporativo: string;
  public tipo_gasto: string;
  public pdf: string;
  public xml: string;
  public identificador_proveedor: string;
  public identificador_sucursal: string;
  public identificador_corporativo: string;
  public guardar: number;
  public prorrateo: number;
  public preliminar_id: number;
  public estatus_preliminar: number;
  public cfdi_id: number;
  public tipo_movimiento: number;
  public monto_solicitud: number;
  public monto_no_deducible: number;
  public identificador_cuenta: string;
  public cuentas_prorrateo: CuentaProrrateo[];
}
export class CuentaProrrateo {
  preliminar_detalle_id: number;
  identificador_cuenta_agrupacion: string;
  ceco: string;
  importe_asignado: number;
  porcentaje_asignado: number;
}

export class Gasto {
  public identificador_contribuyente: string;
  public identificador_corporativo: string;
  public id_tipo_gasto: number;
  public identificador_sucursal: string;
  public identificador_proveedor: string;
  public identificador_cuenta: string;
  public cuenta_deducible: number;
  public identificador_departamento: string;
  public ctas_prorrateo: Array<RequestGastoProrrateoDataModel>;
  public xml: string;
  public pdf: string;
  public tipo_movimiento: number;
  public preliminar_id: number;
}

class RequestGastoProrrateoDataModel {
  public identificador_cuenta: string;
  public identificador_departamento: string;
  public cuenta_deducible: number;
}

export class DetallesComprobacion {
  id: number;
  contribuyente_identificador: string;
  tipo_gasto_id: number;
  proveedor_identificador: string;
  fecha_creacion: string;
  fecha_contabilizacion: string;
  estatus: number;
  solicitud_anticipo_id: number;
  estatus_sap: number;
  sucursal_identificador: string;
  folio_sap: string;
  numero_acreedor: string;
  libro_caja_id: number;
  usuario_identificador: string;
  identificador_corporativo: string;
  empresa: string;
  hotel: string;
  tipo_gasto: string;
  usuario_acreedor: string;
  estatus_descripcion: string;
  estatus_sap_descripcion: string;
  detalle: DetalleDetalleComprobacion[];
}
class DetalleDetalleComprobacion {
  id: number;
  preliminar_id: number;
  id_cuenta_agrupacion: number;
  documento_cfdi_id: number;
  descripcion: string;
  subtotal: number;
  total: number;
  moneda: string;
  ceco: string;
  pdf: string;
  prorrateo: number;
  fecha_inicio_comprobacion: string;
  fecha_fin_comprobacion: string;
  descripcion_cuenta: string;
  identificador_cuenta: string;
}

export class TipoGastoComprobacion {
  activo: number;
  corporativo_identificador: string;
  cuenta_gasto_contribuyente: string;
  fecha_actualizacion: string;
  fecha_creacion: string;
  frecuencia_fiscal: string;
  frecuencia_fiscal_id: number;
  id: number;
  id_id: number;
  nombre: string;
  numero_dias: number;
  text: string;
  tipo_gasto: string;
  tipo_gasto_id: number;
  usuario_actualizo_identificador: string;
  usuario_creo_identificador: string;
  valor_nacional: number;
}
