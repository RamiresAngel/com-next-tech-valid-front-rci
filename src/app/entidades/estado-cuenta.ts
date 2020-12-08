export class EstadoCuenta {
    tipo: string;
    anio: number;
    mes: string;
    fecha_ini: Date;
    fecha_fin: Date;

    constructor() {
        this.tipo = '1';
        this.anio = 0;
        this.mes = '';
    }
}

