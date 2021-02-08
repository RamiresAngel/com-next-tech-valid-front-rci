export class ComprobanteRCI {
  conceptos: ConceptoComprobanteRCI[];
  tarjeta_corporativa: number
  xml: string;
  file: string;
  nacional: number;
  fecha_comprobante: string;
  forma_pago: string;
  moneda: string;
  tipo_cambio: number
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
  index: number
  lista_negra: number;
  numero_comprobante: string;
  sucursal_identificador: string;
  fecha_comprobante_seleccionada: string;
  identificador_proveedor: string;
  pagado_compania: number;
}

export class ConceptoComprobanteRCI {
  impuestos: ImpuestoComprobanteRCI;
  informacionAduanera: any;
  cuentaPredial: any;
  complementoConcepto: any;
  parte: any;
  claveProdServ: string;
  noIdentificacion: any;
  cantidad: number;
  claveUnidad: string;
  unidad: string;
  descripcion: string;
  valorUnitario: number;
  importe: number;
  descuento: number
  descuentoSpecified: boolean;
  anticipo: boolean;
  total: number;
  cuenta: string;
  id_cuenta_agrupacion: number;
  concepto: string;
  monto: number;
  valido: boolean;
  aplica: boolean;
  uuid: string;
  fecha_comprobante: string;
  pagado_compania: number;
  tipo_cambio: number;
  fecha_comprobante_seleccionada: string;
  montoRembolsar: number;
}

export class ImpuestoComprobanteRCI {
  traslados: {
    base: number
    impuesto: string,
    tipoFactor: string,
    tasaOCuota: string,
    tasaOCuotaSpecified: true,
    importe: number
    importeSpecified: true
  }[];
  retenciones: any
}
