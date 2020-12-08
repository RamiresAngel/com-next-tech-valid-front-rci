export class CajaChica {
    descripcion: string;
    contributente_identificador: string;
    sucursal_identificador: string;
    monto: number;
    file: string;
    usuario_identificador: string;
    id_moneda: number;
    no_libro_caja: string;
    identificador: string;
    id_caja_chica: number;
    identificador_departamento: number;
    identificador_centro_consumo: number;
    identificador_corporativo: string;

    constructor() {
        this.descripcion = '';
        this.contributente_identificador = '';
        this.sucursal_identificador = '';
        this.monto = 0;
        this.file = '';
        this.usuario_identificador = '';
        this.id_moneda = 0;
        this.no_libro_caja = '';
        this.identificador = '';
        this.id_caja_chica = 0;
        this.identificador_departamento = 0;
        this.identificador_centro_consumo = 0;
        this.identificador_corporativo = '';
    }
}
