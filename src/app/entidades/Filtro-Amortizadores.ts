export class FiltroAmortizadores {
    corporativo_identificador: string;
    contributente_identificador: string;
    sucursal_identificador: string;
    acreedor_identificador: string;
    cuenta_identificador: string;
    folio_fiscal: string;
    estatus_amortizacion_identificador: string;
    fecha_creacion_desde: string;
    fecha_creacion_hasta: string;
    identificador_contribuyente: string;
    identificador_corporativo: string;
    usuario_identificador: string;
    aprobador: Number;

    constructor() {
        this.contributente_identificador = '';
        this.sucursal_identificador = '';
        this.acreedor_identificador = '';
        this.cuenta_identificador = '';
        this.folio_fiscal = '';
        this.estatus_amortizacion_identificador = '';
        this.fecha_creacion_desde = '';
        this.fecha_creacion_hasta = '';
    }
}
