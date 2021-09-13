export class CargaMasiva {

    identificador_contribuyente: string;
    identificador_sucursal: string;
    identificador_proveedor: string;
    identificador_usuario: string;
    nombre_zip: string;
    zip: string;

    constructor() {
        this.identificador_contribuyente = '';
        this.identificador_sucursal = '';
        this.identificador_proveedor = '';
        this.identificador_usuario = '';
        this.nombre_zip = '';
        this.zip = '';
    }
}

export class FiltroCargaMasiva {
    usuario_identificador: string;
    fecha_inicio_recepcion: string;
    fecha_fin_recepcion: string;
    sucursal_identificador: string;
    identificador_lote: string;
    listtype: string;

    constructor() {
        this.usuario_identificador = '';
        this.fecha_inicio_recepcion = '';
        this.fecha_fin_recepcion = '';
        this.sucursal_identificador = '';
        this.identificador_lote = '';
        this.listtype = 'list';

    }
}