export class TipoRetencion {
  id: number;
  nombre: string;
  clave_tipo: string;
  descripcion_tipo: string;
  clave_indicador: string;
  descripcion_indicador: string;
  porcentaje: string;
  identificador_corporativo: string;
  identificador_header: string;
  tasa: number;
  importe: number;
  tipo_retencion_id: number;
  local: number;

  constructor() {
    this.nombre = '';
    this.clave_tipo = '';
    this.descripcion_tipo = '';
    this.clave_indicador = '';
    this.descripcion_indicador = '';
    this.tasa = 0;
    this.porcentaje = '';
    this.identificador_corporativo = '';
  }
}
