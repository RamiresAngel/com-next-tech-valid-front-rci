import { Proveedor } from './proveedor';
import { Moneda } from './flujo-aprobacion';

export class DescuentoProntoPago {
    id: number;
    fecha_inicio: any;
    fecha_fin: any;
    porcentaje_dpp: number;
    monto_disponible_mxn: number;
    monto_restante_mxn: number;
    monto_disponible_eur: number;
    monto_disponible_gbp: number;
    monto_disponible_usd: number;
    monto_restante_usd: number;
    identificador_usuario: string;
    fecha_finalizacion: any;
    identificador_corporativo: string;
    estatus: number;
    dpp_proveedores: Proveedor[];
    dpp_moneda: Moneda[];
    identificador_sucursal: string;
    identificador_contribuyente: string;
    sucursal: string;
    contribuyente: string;


    constructor() {
        this.id = 0;
        this.porcentaje_dpp = 0;
        this.monto_disponible_mxn = 0;
        this.monto_restante_mxn = 0;
        this.monto_disponible_gbp = 0;
        this.monto_disponible_eur = 0;
        this.monto_disponible_usd = 0;
        this.monto_restante_usd = 0;
        this.estatus = 0;
        this.dpp_proveedores = new Array<Proveedor>();
    }
}

export class LoteDPP {
    facturas: FacturaDPP[];
    identificador_lote: string;
    estatus_convocatoria: number;
}


export class FacturaDPP {
    id: number;
    proveedor_identificador: string;
    sucursal_identificador: string;
    serie: string;
    folio: string;
    rfc_proveedor: string;
    nombre_proveedor: string;
    fecha_factura: string;
    fecha_recepcion: string;
    subtotal: number;
    descuento: number;
    total_factura: number;
    estado_recepcion: number;
    estado_sat: string;
    version: string;
    tipo_comprobante: string;
    certificado_sat: string;
    pac_certificador: string;
    num_certificado: string;
    fecha_certificacion: string;
    folio_fiscal: string;
    identificador_usuario: string;
    moneda: string;
    metodo_pago: string;
    pagado: number;
    estado_sap: number;
    tipo_movimiento_doc: number;
    tipo_cambio: number;
    lugar_expedicion: string;
    forma_pago: string;
    folio_sap: string;
    xml: string;
    pdf: string;
    total_impuestos_traslados: number;
    total_impuestos_retenidos: number;
    uso_cfdi: string;
    reproceso: number;
    numero_orden: string;
    participacion_dpp: number;
    folio_sap_dpp: string;
    receptor_rfc: string;
    identificador_fiscal: string;
    receptor_nombre: string;
    sucursal: string;
    sucursal_codigo: string;
    estado_recepcion_descripcion: string;
    estado_sap_descripcion: string;
    contribuyente_rfc: string;
    contribuyente_razon_social: string;
    empresa: string;
    estatus_dpp: string;
}
