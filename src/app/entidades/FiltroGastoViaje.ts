export class FiltroGastosViaje {
    contributente_identificador: string;
    sucursal_identificador: string;
    numero_anticipo_sap: string;
    fecha_inicio_viaje: string;
    fecha_fin_viaje: string;
    estatus_sap: number;
    estatus: number;
    destino: string;
    identificador_corporativo: string;
    listtype: string;
    usuario_identificador: string;
    tipo_gasto_id: number;
    aprobador: Number;

    constructor() {
        this.contributente_identificador = '';
        this.sucursal_identificador = '';
        this.numero_anticipo_sap = '';
        this.fecha_inicio_viaje = '';
        this.fecha_fin_viaje = '';
        this.estatus_sap = 0;
        this.estatus = 0;
        this.destino = '';
        this.identificador_corporativo = '';
        this.listtype = '';
        this.usuario_identificador = '';
        this.tipo_gasto_id = 0;
        this.aprobador = 0;
    }
}