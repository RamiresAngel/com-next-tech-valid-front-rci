export class MetodoPago {
    id: number;
    codigo: string;
    descripcion: string;
    activo: number;
    identificador_corporativo: string;

    constructor() {
        this.id = 0;
        this.codigo = '';
        this.descripcion = '';
        this.activo = 0;
        this.identificador_corporativo = '';

    }
}