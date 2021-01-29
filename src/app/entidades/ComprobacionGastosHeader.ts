export class ComprobacionGastosHeader {
  public nombre_usuario: string;
  public contribuyente: string;
  public centro_costos: string;
  public tipo_gastos: string;
  public motivo: string;
  public recuperable: boolean;
  public monto_reembolsar: number;
  public folio_comprobacion: number;
  public id: number;
  public compania: string;
  public aprobador: string;
  public aprobador_nombre: string;
  public destino: string;
  public moneda: string;

  constructor() {
    this.nombre_usuario = '';
    this.contribuyente = '';
    this.centro_costos = '';
    this.tipo_gastos = '';
    this.motivo = '';
    this.recuperable = false;
    this.monto_reembolsar = 0;
    this.folio_comprobacion = 0;
    this.id = 0;
    this.compania = '';
    this.aprobador = '';
    this.destino = '';
    this.moneda = '';
  }
}
