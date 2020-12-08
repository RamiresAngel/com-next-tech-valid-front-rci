export class Modulo {
  id: number;
  nombre: string;
  icono: string;
  fecha_creacion: string;
  activo: number;
  categoria_id: number;
  categoria: string;
  usuario_creo: number;
  corporativo_id: number;
  usuario_actualizo_id: number;
  clave_facto: string;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.icono = '';
    this.fecha_creacion = '';
    this.activo = 1;
    this.categoria_id = 0;
    this.categoria = '';
    this.usuario_creo = 1;
    this.corporativo_id = 1;
    this.clave_facto = '';
  }
}
