export class ComprobacionExtranjera {
        tipo_comprobante: string;
        xml: string;
        fecha_comprobante: string;
        numero_comprobante: string;
        forma_pago: string;
        moneda: string;
        tipo_cambio: string;
        conceptos: ConceptoComprobacion[];
        total: Number;
        sucursal_identificador: string;
        identificador_usuario: string;
        identificador_contribuyente: string;
        identificador_corporativo: string;
        identificador_departamento: string;
        descripcion: string;
        id_solicitud: Number;
        id_moneda: Number;

        constructor() {
                this.conceptos = new Array<ConceptoComprobacion>();
        }
}

export class ConceptoComprobacion {
        concepto: string;
        cuenta: string;
        monto: Number;
        id_cuenta_agrupacion: Number;
        pagado_compania: Number;
}

export class ComprobacionHeader {
        tipo_comprobante: number;
        file: string;
        fecha_comprobante: string;
        numero_comprobante: string;
        forma_pago: string;
        moneda: string;
        tipo_cambio: number;
        conceptos: Array<ConceptoFactura>
        total: number;
        identificador_usuario: string;
        identificador_contribuyente: string;
        identificador_corporativo: string;
        identificador_departamento: string;
        descripcion: string;
        id_solicitud: number;
        id_moneda: number;
        nacional: number;
        id_tipo_gasto: number;
        identificador_sucursal: string;
        identificador_proveedor: string;
        identificador_cuenta: string;
        xml: string;
        pdf: string;
        tipo_documento_id: number;
        guardar: number;
        prorrateo: number;
        preliminar_id: number;
        tipo_movimiento: number;
        monto_solicitud: number;
        id_cuenta_agrupacion: number;
        descripcion_cuenta: string;
        ceco: string;
        index: number;

        constructor() {
                this.conceptos = new Array<ConceptoFactura>();
        }
}
export class ConceptoFactura {
        concepto: string;
        cuenta: string;
        monto: number;
        pagado_compania: number;
        id_cuenta_agrupacion: number;

}