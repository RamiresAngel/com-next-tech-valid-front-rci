export class FiltroCodigosRecepcion {
  public identificador_contribuyente: string;
  public sucursal_identificador: string;
  public fecha_inicio: string;
  public fecha_fin: string;
  public codigo_recepcion: string;
  public numero_orden_compra: string;
  public identificador_corporativo: string;
  public listtype: string;


  constructor() {
    this.identificador_contribuyente = '';
    this.sucursal_identificador = '';
    this.fecha_inicio = '';
    this.fecha_fin = '';
    this.codigo_recepcion = '';
    this.numero_orden_compra = '';
    this.identificador_corporativo = '';
    this.listtype = '';
  }
}
