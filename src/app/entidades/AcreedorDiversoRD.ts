export class AcreedorDiversoRD {
  contribuyente: string;
  sucursal: string;
  acreedor: string;
  descripcion: string;
  nfc: string;
  importe: string;
  moneda: string;
  impuesto: string;
  forma_pago: string;
  total: string;
  archivo: string;
  cuenta: string;
  fecha_factura: string;
  proveedor: string;
  proveedor_informal: number;

  constructor() {
    this.contribuyente = '';
    this.sucursal = '';
    this.acreedor = '';
    this.descripcion = '';
    this.nfc = '';
    this.importe = '';
    this.moneda = '';
    this.impuesto = '';
    this.forma_pago = '';
    this.total = '';
    this.archivo = '';
    this.cuenta = '';
    this.proveedor = '';
  }
}
