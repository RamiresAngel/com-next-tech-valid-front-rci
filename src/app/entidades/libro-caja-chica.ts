export class Libro {
    id: number;
    numero_libro: number;
    nombre_contribuyente: string;
    // fecha_creacion: string;
    identificador_contribuyente: string;
    identificador_usuario: string;
    saldo: number;
    saldo_limite: number;
    numero_libro_sap: string;
    estatus: number;
    identificador_sucursal: string;
    nombre_sucursal: string;
    identificador_corporativo: string;
    nombre_corporativo: string;
    identificador_responsable: string;

    constructor() {
        this.id = 0;
        this.numero_libro = null;
        this.nombre_contribuyente = '';
        // this.fecha_creacion = '';
        this.identificador_contribuyente = null;
        this.identificador_usuario = null;
        this.saldo = null;
        this.saldo_limite = null;
        this.numero_libro_sap = '';
        this.estatus = 1;
        this.identificador_sucursal = '';
        this.nombre_sucursal = null;
        this.identificador_corporativo = '';
        this.nombre_corporativo = '';
        this.identificador_responsable = '';
    }
}
