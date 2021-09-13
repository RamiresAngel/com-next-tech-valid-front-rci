export class Funcionalidad {
  id: number;
  icono: string;
  target: string;
  action: string;
  usuario_creo_id: number;
  usuario_actualizo_id: string;
  fecha_creacion: string;
  modulo_id: number;
  activo: number;
  modulo: string;
  ambito: number;
  corporativo_id: number;
  cat_funcionalidad_id: number;
  clave_facto: string;

  constructor() {
    this.id = 0;
    this.icono = '';
    this.target = '';
    this.action = '';
    this.usuario_creo_id = 1;
    this.usuario_actualizo_id = '';
    this.fecha_creacion = '';
    this.modulo_id = 0;
    this.activo = 1;
    this.ambito = 1;
    this.modulo = '';
    this.corporativo_id = 0;
    this.cat_funcionalidad_id = 1;
    this.clave_facto = '';
  }
}

export class FuncionalidadMin {
  id: number;
  icono: string;
  target: string;
  action: string;
  modulo: string;

  constructor() {
    this.id = 0;
    this.icono = '';
    this.target = '';
    this.action = '';
    this.modulo = '';
  }
}
