export class UsuarioProveedor {
    id: number;
    nombre: string;
    activo: number;
    email: string;
    ultima_actualizacion: Date;
    identificador_usuario: string;
    fecha_creacion: Date;
    email_alterno: string;
    identificador_proveedor: string;
    password: string;
    token: string;
    pais: string;
    identificador_corporativo: string;
    acreedor: number;
    proveedor: number;
    reset_password: number;
    origen_portal: number;
    rfc: string;
    persona_fisica: number;
    estatus_descripcion: string;
    extranjero: number;
    numero_proveedor: string;

    constructor() {
      this.id = 0;
      this.nombre = '';
      this.activo = 0;
      this.email = '';
      this.ultima_actualizacion = new Date();
      this.identificador_usuario = '';
      this.fecha_creacion = new Date();
      this.email_alterno = '';
      this.identificador_proveedor = '';
      this.password = '';
      this.token = '';
      this.pais = '';
      this.identificador_corporativo = '';
      this.acreedor = 0;
      this.proveedor = 0;
      this.reset_password = 0;
      this.origen_portal = 0;
      this.rfc = '';
      this.persona_fisica = 0;
      this.estatus_descripcion = '';
      this.extranjero = 0;
      this.numero_proveedor = '';
    }

}

