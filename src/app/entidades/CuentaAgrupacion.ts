export class CuentaAgrupacion {
    identificador_corporativo: string;
    corporativo: string;
    identificador_contribuyente: string;
    contribuyente: string;
    identificador_cuenta: string;
    cuenta: string;
    identificador_departamento: string;
    departamento: string;
    codigo_contribuyente: string;
    codigo_cuenta: string;
    codigo_dep: string;
    identificador_sucursal: string;
    tipo_gasto: number;
    constructor() {
        this.identificador_corporativo = '';
        this.corporativo = '';
        this.identificador_contribuyente = '';
        this.contribuyente = '';
        this.identificador_cuenta = '';
        this.cuenta = '';
        this.identificador_departamento = '';
        this.departamento = '';
        this.tipo_gasto = 0;
    }
}