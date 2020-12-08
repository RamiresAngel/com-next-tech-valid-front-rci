export class FacturaDPP {
    convocatoria: Convocatoria;
    facturas: Array<Factura>;
    }

    class Convocatoria {
        id: number;
        fecha_inicio: string;
        fecha_fin: string;
        porcentaje_dpp: number;
        identificador_usuario: string;
        fecha_finalizacion: string;
        fecha_creacion: string;
        identificador_corporativo: string;
        estatus: number;
        identificador_contribuyente: string;
        identificador_sucursal: string;
        dpp_moneda: Array<DppMoneda>;
        dpp_proveedores: null;
    }
    class DppMoneda {
      id: number;
      id_moneda: number;
      descuento_pronto_pago_id: number;
      monto_restante: number;
      monto_disponible: number;
    }
    class Factura {
        id: number;
        empresa: string;
        proveedor_identificador: string;
        sucursal_identificador: string;
        serie:  string;
        folio:  string;
        rfc_proveedor:  string;
        nombre_proveedor:  string;
        fecha_factura:  string;
        fecha_recepcion:  string;
        subtotal: number;
        descuento: number;
        total_factura: number;
        estado_recepcion: number;
        estado_sat:  string;
        version:  string;
        tipo_comprobante:  string;
        certificado_sat: null;
        pac_certificador: null;
        num_certificado: null;
        fecha_certificacion:  string;
        folio_fiscal:  string;
        identificador_usuario: null;
        moneda:  string;
        metodo_pago:  string;
        pagado: number;
        estado_sap: number;
        tipo_movimiento_doc: number;
        tipo_cambio: number;
        lugar_expedicion: null;
        forma_pago:  string;
        folio_sap:  string;
        xml:  string;
        pdf:  string;
        total_impuestos_traslados: number;
        total_impuestos_retenidos: number;
        uso_cfdi:  string;
        reproceso: number;
        numero_orden: null;
        receptor_rfc: null;
        identificador_fiscal:  string;
        receptor_nombre: null;
        sucursal:  string;
        sucursal_codigo: null;
        estado_recepcion_descripcion: null;
        estado_sap_descripcion: null;
        contribuyente_rfc:  string;
        contribuyente_razon_social: null;
    }
