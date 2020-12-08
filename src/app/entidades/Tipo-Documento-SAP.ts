export class TipoDocumentoSAP {
    id: Number;
    tipo_documento: string;
    descripcion_documento: string;
    validar_items: Number;
    total_max_porcentaje: Number;
    total_min_porcentaje: Number;
    total_max_monto: Number;
    total_min_monto: Number;
    identificador_corporativo: string;

    constructor() {
        this.id = 0;
        this.tipo_documento = '';
        this.descripcion_documento = '';
        this.validar_items = 1;
        // this.total_max_porcentaje = 0;
        // this.total_min_porcentaje = 0;
        // this.total_max_monto = 0;
        this.total_min_monto = 0;
        this.identificador_corporativo = '';
    }
}
