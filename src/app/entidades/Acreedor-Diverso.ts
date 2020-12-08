import { CuentaProrrateo } from './comprobacion';
import { NumericLiteral } from 'typescript';

export class AcreedorDiverso {
    pdf: string;
    xml: string;
    identificador_proveedor: string;
    numero_proveedor: string;
    identificador_sucursal: string;
    identificador_corporativo: string;
    identificador_contribuyente: string;
    identificador_departamento: string;
    identificador_cuenta: string;
    id_tipo_gasto: number;
    tipo_gasto: number;
    tipo_movimiento: number;
    id_cuenta_agrupacion: number;
    cuentas_prorrateo: CuentaProrrateo[];
    prorrateo: number;
    identificador_usuario: string;
    descripcion: string;
    cuenta_deducible: Number;
    lista_negra: Number;

    constructor() {
        this.cuentas_prorrateo = new Array<CuentaProrrateo>();
        this.pdf = '';
        this.xml = '';
        this.identificador_proveedor = '';
        this.numero_proveedor = '';
        this.identificador_sucursal = '';
        this.identificador_corporativo = '';
        this.identificador_contribuyente = '';
        this.identificador_departamento = '';
        this.identificador_cuenta = '';
        this.id_tipo_gasto = 0;
        this.tipo_movimiento = 0;
        this.id_cuenta_agrupacion = 0;
        this.prorrateo = 0;
        this.identificador_usuario = '';
        this.descripcion = '';
        this.cuenta_deducible = 0;
    }
}

export class DetalleAcreedorDiverso {
    contribuyente_identificador: string;
    detalle: DetalleDetalleAcreedor[];
    empresa: string;
    estatus: number;
    estatus_descripcion: string;
    estatus_sap: number;
    estatus_sap_descripcion: string;
    fecha_contabilizacion: string;
    fecha_creacion: string;
    folio_sap: string;
    hotel: string;
    id: number;
    identificador_corporativo: string;
    libro_caja_id: number;
    numero_acreedor: string;
    proveedor_identificador: string;
    solicitud_anticipo_id: number;
    sucursal_identificador: string;
    tipo_gasto: string;
    tipo_gasto_id: number;
    usuario_acreedor: string;
    usuario_identificador: string;
    constructor() {
        this.detalle = new Array<DetalleDetalleAcreedor>();
    }
}

export class DetalleDetalleAcreedor {
    ceco: string;
    descripcion: string;
    descripcion_cuenta: string;
    documento_cfdi_id: number;
    fecha_fin_comprobacion: string;
    fecha_inicio_comprobacion: string;
    id: number;
    id_cuenta_agrupacion: number;
    identificador_cuenta: string;
    moneda: string;
    pdf: string;
    preliminar_id: number;
    prorrateo: number;
    subtotal: number;
    total: number;
}

export class FlujoAprobacion {
    id_solicitud: string;
    aprobador: string;
    fecha_aprobacion: string;
    estatus: string;
}
