export class NivelGasto {
    id: Number;
    terminacion: string;
    descripcion: string;
    activo: Number;
    record_date: string;
    identificador: string;
    identificador_corporativo: string;

    constructor() {
        this.id = 0;
        this.terminacion = '';
        this.descripcion = '';
        this.activo = 1;
        this.record_date = null;
        this.identificador = '';
        this.identificador_corporativo = '';
    }
}
