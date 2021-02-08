export class ComprobantePapel {
  conceptos: ConceptoComprobantePapel[];
  tarjeta_corporativa: number;
  xml: string;
  file: string;
  nacional: number;
  fecha_comprobante: string;
  forma_pago: string;
  moneda: string;
  tipo_cambio: number;
  tipo_comprobante: string;
  total: number;
  id_moneda: number;
  descripcion: string;
  tipo_documento_id: number;
  id_tipo_gasto: number;
  id_solicitud: number;
  identificador_contribuyente: string;
  identificador_corporativo: string;
  identificador_departamento: string;
  identificador_usuario: string;
  identificador_sucursal: string;
  numero_comprobante: string;
  sucursal_identificador: string;
  fecha_comprobante_seleccionada: string;
  identificador_proveedor: string;
  pagado_compania: number;
  index: number;
  lista_negra: number;
}

export class ConceptoComprobantePapel {
  concepto: string;
  cuenta: string;
  importe: number;
  id_cuenta_agrupacion: number;
  anticipo: number;
  pagado_compania: number;
  fecha_comprobante: string;
  fecha_comprobante_seleccionada: string;
  uuid: string;
  monto: number;
}
