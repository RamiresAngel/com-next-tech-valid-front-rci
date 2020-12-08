export class GastosViaje {
    id: number;
    numViaje: string;
    descripcion: string;
    contributente_identificador: string;
    sucursal_identificador: string;
    monto: Number;
    montoAprox: number;
    file: string;
    usuario_identificado: string;
    moneda: string;
    fecha_inicio_viaje: string;
    fecha_fin_viaje: string;
    motivo: string;
    destino: string;
    referencia: string;
    identificador_departamento: string;
    identificador_centro_consumo: string;

    constructor() {
        this.numViaje = '';
        this.descripcion = '';
        this.contributente_identificador = '';
        this.sucursal_identificador = '';
        this.monto = 0;
        this.montoAprox = 0;
        this.file = '';
        this.usuario_identificado = '';
        this.moneda = '';
        this.fecha_inicio_viaje = '';
        this.fecha_fin_viaje = '';
        this.motivo = '';
        this.destino = '';
        this.referencia = '';
        this.identificador_departamento = '';
        this.identificador_centro_consumo = '';
    }
}
