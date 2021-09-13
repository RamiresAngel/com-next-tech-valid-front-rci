export class ConceptoCargaDocumentos {
  id: number;
  cantidad: number;
  concepto: string;
  importe: number;
  monto_impuesto: number;
  valor_unitario: number;
  identificador_header: string;
  impuestos: ImpuestoConcepto[]
}

export class ImpuestoConcepto {
  id: number;
  factura_proveedor_item_id: number;
  clave: string;
  tasa: number;
  importe: number;
  impuesto_id: number;
  local: number;
}
