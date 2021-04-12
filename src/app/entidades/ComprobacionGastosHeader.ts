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
  nota_recuperable: string;
  nombre_usuario_aprobador: string;
  nombre_usuario: string;
  recuperable: number;
  id: number;
  folio_comprobacion: number;
  nombre_cc: string;
  nombre_compania: string;
  nombre_moneda: string;
  estatus: string;
  comprobaciones: ComprobacionGastosDetalle[];
  recordDate: string;
  moneda: string;
  total_gastado: number;
  tipo_cambio: number;
  estatus_id: number;


  constructor() {
    this.identificador_usuario = '';
    this.usuario = '';
    this.identificador_compania = '';
    this.identificador_cc = '';
    this.tipo_gasto = 0;
    this.identificador_aprobador = '';
    this.aprobador = '';
    this.id_moneda = 0;
    this.tipo_cambio = 1;
    this.monto_reembolsar = 0;
    this.descripcion = '';
    this.motivo = '';
    this.nota_recuperable = '';
    this.recuperable = 0;
    this.estatus = '';
    this.estatus_id = 0;
  }
}
