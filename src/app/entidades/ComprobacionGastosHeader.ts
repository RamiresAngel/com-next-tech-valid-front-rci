export class ComprobacionGastosHeader {
  identificador_usuario: string;
  usuario: string;
  identificador_compania: string;
  identificador_cc: string;
  tipo_gasto: number;
  identificador_aprobador: string;
  aprobador: string;
  id_moneda: number;
  monto_reembolsar: number;
  descripcion: string;
  motivo: string;
  recuperable: number;

  constructor() {
    this.monto_reembolsar = 0;
  }
}
