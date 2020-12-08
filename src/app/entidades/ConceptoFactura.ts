export class ConceptoFactura {
    identificador: string;
    detalle: string;
    monto: string;
    concepto: string;
    anticipo: boolean;
    valido: boolean;
    cuenta: string;

    constructor() {
      this.identificador = '';
      this.detalle = '';
      this.monto = '';
      this.concepto = '';
      this.anticipo = false;
      this.cuenta = '';
      this.valido = false;
    }
}


export class ValidadorDetalle {
    detalle: string;
    concepto: string;
    cuenta: string;
    monto: string;
    pago_compania: boolean;
}
