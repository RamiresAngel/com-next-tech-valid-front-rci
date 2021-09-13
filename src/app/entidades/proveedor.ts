import { t } from "@angular/core/src/render3";

export class Proveedor {
  id: number;
  nombre: string;
  numero_proveedor: string;
  rfc: string;
  correo: string;
  extranjero: number;
  estatus: number;
  correo_adjuntos: string;
  correo_ventas: string;
  persona_fisica: number;
  acreedor: number;
  fecha_creacion: string;
  grupo_cuenta: string;
  identificador_corporativo: string;
  sociedades: string;
  identificador: string;
  estatus_desciprcion: string;
  proveedor: number;
  password: string;
  use: User;
  identificador_proveedor: string;
  sitio: string;
  moneda: string;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.numero_proveedor = '';
    this.rfc = '';
    this.correo = '';
    this.extranjero = 0;
    this.estatus = 0;
    this.correo_adjuntos = '';
    this.correo_ventas = '';
    this.persona_fisica = 0;
    this.acreedor = 0;
    this.fecha_creacion = '';
    this.grupo_cuenta = '';
    this.identificador_corporativo = '';
    this.sociedades = '';
    this.identificador = '';
    this.estatus_desciprcion = '';
    this.proveedor = 0;
    this.password = '';
    this.use = new User();
    this.sitio = '';
    this.moneda = '';
  }
}

class User {
  id: number;
  nombre: string;
  activo: number;
  email: string;
  ultima_actualizacion: string;
  identificador_usuario: string;
  fecha_creacion: string;
  email_alterno: string;
  identificador_proveedor: string;
  password: string;
  token: string;
  pais: string;
  identificador_corporativo: string;
  acreedor: number;
  proveedor: number;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.activo = 0;
    this.email = '';
    this.ultima_actualizacion = '';
    this.identificador_usuario = '';
    this.fecha_creacion = '';
    this.email_alterno = '';
    this.identificador_proveedor = '';
    this.password = '';
    this.token = '';
    this.pais = '';
    this.identificador_corporativo = '';
    this.acreedor = 0;
    this.proveedor = 0;
  }
}


export class ProveedorMin {
  public correo: string;
  public estatus: number;
  public id: number;
  public identificador: string;
  public nombre: string;
  public numero_proveedor: string;
  public persona_fisica: any;
  public password: string;
  public correo_adjuntos: string;

  constructor() {
    this.correo = '';
    this.estatus = 0;
    this.id = 0;
    this.identificador = '';
    this.nombre = '';
    this.numero_proveedor = '';
    this.persona_fisica = '';
    this.password = '';
    this.correo_adjuntos = '';
  }
}
