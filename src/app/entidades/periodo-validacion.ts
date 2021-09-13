export class PeriodoValidacion {
  id: number;
  mes: number;
  nombre_mes: string;
  fecha_inicio: string;
  fecha_fin: string;
  persona_tipo: number;
  identificador_corporativo: string;

  constructor(
    mes = null,
    nombre_mes = ''
  ) {
    this.id = 0;
    this.mes = mes;
    this.nombre_mes = nombre_mes;
    this.fecha_inicio = '';
    this.fecha_fin = '';
    this.persona_tipo = null;
    this.identificador_corporativo = '';
  }

  crearMeses(): Array<PeriodoValidacion> {
    const meses = new Array<PeriodoValidacion>();
    const enero = new PeriodoValidacion(1, 'Enero');
    const febrero = new PeriodoValidacion(2, 'Febrero');
    const marzo = new PeriodoValidacion(3, 'Marzo');
    const abril = new PeriodoValidacion(4, 'Abril');
    const mayo = new PeriodoValidacion(5, 'Mayo');
    const junio = new PeriodoValidacion(6, 'Junio');
    const julio = new PeriodoValidacion(7, 'Julio');
    const agosto = new PeriodoValidacion(8, 'Agosto');
    const septiembre = new PeriodoValidacion(9, 'Septiembre');
    const octubre = new PeriodoValidacion(10, 'Octubre');
    const noviembre = new PeriodoValidacion(11, 'Noviembre');
    const diciembre = new PeriodoValidacion(12, 'Diciembre');
    meses.push(enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre);
    return meses;
  }
}
