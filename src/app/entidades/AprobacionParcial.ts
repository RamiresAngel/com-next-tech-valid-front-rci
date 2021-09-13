export class AprobacionParcial {
  header_preliminar_id: number;
  tipo_gasto: number;
  identificador_aprobador: string;
  comentario: string;
  documentos: AprobacionParcialConcepto[];
  constructor() {
    this.documentos = new Array<AprobacionParcialConcepto>();
  }
}

export class AprobacionParcialConcepto {
  preliminar_id: number;
  seleccionado: boolean
  comentario: string;

  constructor() {
    this.seleccionado = false;
    this.comentario = "";
  }
}
