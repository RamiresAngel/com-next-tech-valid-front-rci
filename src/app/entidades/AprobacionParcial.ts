export class AprobacionParcial {
  id_preliminar: number;
  tipo_gasto: number;
  identificador_aprobador: string;
  comentario: string;
  documentos: AprobacionParcialConcepto[];
  constructor() {
    this.documentos = new Array<AprobacionParcialConcepto>();
  }
}

export class AprobacionParcialConcepto {
  preliminar_detalle_id: number;
  aprobado: boolean
  comentario: string;

  constructor() {
    this.aprobado = false;
    this.comentario = "";
  }
}
