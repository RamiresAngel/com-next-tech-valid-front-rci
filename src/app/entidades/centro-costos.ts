export class CentroCostos {
  id: number;
  nombre: string;
  emisor_identificador: string;
  sucursal_identificador: string;
  codigo: string;
  identificador_corporativo: string;
  identificador_departamento: string;
  estatus: number;
  fecha_creacion: string;
  fecha_modificacion: string;
  identificador: string;
  centro_consumo;
  ceco;
  usuario_id: number;
  centro_consumo_identificador: string;
  rol_id: number;
  rol_nombre: string;
  centro_consumo_nombre: string;


  constructor() {
    this.id = 0;
    this.nombre = '';
    this.emisor_identificador = '';
    this.sucursal_identificador = '';
    this.codigo = '';
    this.identificador_corporativo = '';
    this.identificador_departamento = '';
    this.estatus = 1;
    this.fecha_creacion = '';
    this.fecha_modificacion = '';
    this.identificador = '';
  }
}
