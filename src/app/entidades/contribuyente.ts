export class Contribuyente {
  estatus: number;
  nombre: string;
  identificador_fiscal: string;
  identificador: string;
  razon_social: string;
  corporativo_identificador: string;
  nombre_corto: string;
  codigo: string;
  calle: string;
  no_interior: string;
  no_exterior: string;
  colonia: string;
  localidad: string;
  municipio: string;
  estado: string;
  pais: string;
  codigo_postal: string;

  constructor() {
    this.estatus = 1;
    this.nombre = '';
    this.identificador_fiscal = '';
    this.razon_social = '';
    this.corporativo_identificador = '';
    this.nombre_corto = '';
    this.codigo = '';
    this.calle = '';
    this.no_interior = '';
    this.no_exterior = '';
    this.colonia = '';
    this.localidad = '';
    this.municipio = '';
    this.estado = '';
    this.pais = '';
    this.codigo_postal = '';
  }
}
