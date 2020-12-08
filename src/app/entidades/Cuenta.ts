export class Cuenta {
  id: number;
  cuenta: string;
  nombre_cuenta: string;
  identificador: string;
  record_date: string;
  identificador_corporativo: string;
  identificador_tipo_cuenta: string;
  codigo: string;
  descripcion_cuenta: string;
  descripcion_tipo_cuenta: string;
  descripcion_nivel_gasto: string;
  descripcion_tipo_gasto: string;
  descripcion: string;
  estatus: number;
  deducible: number;
  activo: number;
  identificador_nivel_gasto: string;
  tipo_gasto: number;
  constructor() {
    this.id = 0;
    this.cuenta = '';
    this.nombre_cuenta = '';
    this.identificador = '';
    this.record_date = '';
    this.identificador_corporativo = '';
    this.identificador_tipo_cuenta = '';
    this.codigo = '';
    this.descripcion_cuenta = '';
    this.descripcion = '';
    this.estatus = 1;
    this.deducible = 0;
    this.activo = 0;
    this.identificador_nivel_gasto = '';
  }
}
