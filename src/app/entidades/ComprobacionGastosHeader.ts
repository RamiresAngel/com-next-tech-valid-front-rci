import { ComprobacionGastosDetalle } from './ComprobacionGastosDetalle';
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
  nombre_usuario_aprobador: string;
  nombre_usuario: string;
  recuperable: number;
  id: number;
  folio_comprobacion: number;
  nombre_cc: string;
  nombre_compania: string;
  nombre_moneda: string;
  comprobaciones: ComprobacionGastosDetalle[];

  constructor() {
    this.identificador_usuario = '';
    this.usuario = '';
    this.identificador_compania = '';
    this.identificador_cc = '';
    this.tipo_gasto = 0;
    this.identificador_aprobador = '';
    this.aprobador = '';
    this.id_moneda = 0;
    this.monto_reembolsar = 0;
    this.descripcion = '';
    this.motivo = '';
    this.recuperable = 0;
  }
}
