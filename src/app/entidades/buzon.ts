export class Buzon {
  id: number;
  correo: string;
  usuario: string;
  contrasena: string;
  port: number;
  host_name: string;
  isssl: number;
  smpt_host: string;
  smpt_port: number;
  is_smtp_ssl: number;
  mail_notificaciones: string;
  cco: string;
  identificador_corporativo: string;

  constructor() {
    this.id = 0;
    this.correo = '';
    this.usuario = '';
    this.contrasena = '';
    this.port = 995;
    this.host_name = '';
    this.isssl = 1;
    this.smpt_host = '';
    this.smpt_port = 26;
    this.is_smtp_ssl = 0;
    this.mail_notificaciones = '';
    this.cco = '';
    this.identificador_corporativo = '';
  }
}
