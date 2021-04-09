export class Credenciales {
    contribuyente_identificador: string;
    archivo_cer: string;
    archivo_key: string;
    password: string;

    constructor() {
        this.contribuyente_identificador = '';
        this.archivo_cer = '';
        this.archivo_key = '';
        this.password = '';
    }
}

export class FiltroCancelaciones {
    folio_fiscal: string;
    rfc_proveedor: string;
    rfc_contribuyente: string;
    estatus_cancelacion: string;
    estatus_solicitud: string;

    constructor() {
        this.folio_fiscal = '';
        this.rfc_proveedor = '';
        this.rfc_contribuyente = '';
        this.estatus_cancelacion = '';
        this.estatus_solicitud = '';
    }
}