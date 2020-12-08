export class Departamento {
    id: Number;
    clave_departamento: String;
    descripcion: String;
    activo: Number;
    identificador_corporativo: String;
    record_date: String;
    identificador: String;

    constructor() {
        this.id = 0;
        this.clave_departamento = '';
        this.descripcion = '';
        this.activo = 1;
        this.identificador_corporativo = '';
        this.record_date = null;
        this.identificador = '';
    }
}
