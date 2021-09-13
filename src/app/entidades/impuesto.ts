export class Impuesto {
  id: number;
  descripcion: string;
  tasa: number;
  clave: string;
  identificador_corporativo: string;
  constructor() {
    this.descripcion = '';
    this.clave = '';
    this.identificador_corporativo = '';
  }
}

export class ImpuestoRD {
  id: number;
  bufer_fatura_detail_id: number;
  clave: string;
  tasa: number;
  importe: number;
  impuesto_id: number;
  local: number;
}
