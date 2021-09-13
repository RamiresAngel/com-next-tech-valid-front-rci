export class SucursalMx {
  id: number;
  clave_facto: string;
  fecha_actualizacion: string;
  fecha_creacion: string;
  identificador: string;
  nombre: string;
  corporativo_identificador: string;
  identificador_sucursal: string;
  codigo: string;
  codigo_erp: string;
  creation_date: string;
  codigo_postal: string;
  direccion: string;
  estado: string;
  estatus: number;

  constructor() {
    this.id = null;
    this.clave_facto = '';
    this.fecha_actualizacion = '';
    this.fecha_creacion = '';
    this.identificador = '';
    this.nombre = '';
    this.corporativo_identificador = '';
    this.identificador_sucursal = '';
    this.codigo = '';
    this.codigo_erp = '';
    this.creation_date = '';
    this.codigo_postal = '';
    this.direccion = '';
    this.estado = '';
    this.estatus = 1;
  }

}
