export class Receptor {

  public id: number;
  public nombre: string;
  public rfc: string;
  public calle: string;
  public no_ext: string;
  public no_int: string;
  public colonia: string;
  public localidad: string;
  public municipio: string;
  public estado: string;
  public pais: string;
  public codigo_postal: string;
  public codigo_pais: string;
  public activo: number;
  public corporativo_id: number;
  public unidad_principal: number;
  public asunto_aceptado: string;
  public mensaje_aceptado: string;
  public correo_aviso: string;
  public usuario_creo_id: number;
  public usuario_actualizo_id: number;
  public fecha_creacion: Date;
  public usuario_dgt_test: string;
  public contrasena_gdt_test: string;
  public llave_dgt_test: string;
  public usuario_dgt_prod: string;
  public contrasena_gdt_prod: string;
  public llave_dgt_prod: string;
  public estatus: boolean;
  public password: string;
  public tipo_identificador: string;
  public token: string;
  public ubicacion_provincia: string;
  public ubicacion_canton: string;
  public ubicacion_distrito: string;
  public ubicacion_barrio: string;
  public certificado: string;
  public ubicacion_provincia_nombre: string;
  public ubicacion_canton_nombre: string;
  public ubicacion_distrito_nombre: string;
  public ubicacion_barrio_nombre: string;
  public ubicacion_otras_senas: string;
  public identificacion_numero: string;
}

export  class ReceptorToken {
  public  ConexionCertificado: string;
  public  certificado: string;
  public  password: string;
  public  identificacion_numero: string;
  public  tipo_identificacion: string;
  public  usuario_dgt: string;
  public  password_dgt: string;
  public  clave_facto: string;
  public  file_data: string;
  public  file_name: string;
  public  id: number;
  public  identificador: string;
}

export class TipoIdentificacion {
  public id: number;
  public tipo_identificacion: string;
  public codigo: string;
}
