export class Rol {
  nombre: string;
  administrador_next: number;
  administrador: number;
  identificador_usuario: string;
  corporativo_id: string;
  activo: number;
  clave_facto: string;
  relacion_rol_funcionalidad: Array<RelacionRolFuncionalidad>;
  dafault_cat: string;
  nombre_corporativo: string;
  fecha_creacion: string;
  identificador_usuario_actualizo: string;
  ultima_actualizacion: string;
  id: number;
  identificador_agrupador: string;
  identificador_corporativo: string;
  tipo: string;

  constructor() {
    this.nombre = '';
    this.administrador_next = null;
    this.administrador = null;
    this.identificador_usuario = null;
    this.corporativo_id = null;
    this.activo = 1;
    this.clave_facto = '';
    this.relacion_rol_funcionalidad = new Array<RelacionRolFuncionalidad>();
    this.dafault_cat = null;
    this.nombre_corporativo = null;
    this.fecha_creacion = null;
    this.identificador_usuario_actualizo = null;
    this.ultima_actualizacion = null;
    this.id = 0;
    this.identificador_agrupador = '';
    this.identificador_corporativo = '';
    this.tipo = '';
  }
}

class RelacionRolFuncionalidad {
  funcionalidad_id: number;
  usuario_creo_id: number;

  constructor() {
    this.funcionalidad_id = null;
    this.usuario_creo_id = null;

  }
}
