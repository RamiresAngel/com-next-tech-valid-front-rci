export class DetalleSaldo {
    No_Proveedor: string;
    Nombre: string;
    RFC: string;
    ListaSaldo: SaldoProveedor[];
}

export class SaldoProveedor {
    Sociedad: string;
    Tipo_Doc: string;
    Orden_Compra: string;
    Doc_Compensacion: string;
    Fecha_Compensacion: string;
    Fecha_Contabilizacion: string;
    Fecha_Vencimiento: string;
    Monto: number;
    Estatus: string;
    BloqueoPago: string;
    TipoOrden: string;
    TaxCode: string;
    Moneda: string;
    bloqueoPago: string;
    doc_Compensacion: string;
    estatus: string;
    fecha_Compensacion: string;
    fecha_Contabilizacion: string;
    fecha_Vencimiento: string;
    moneda: string;
    monto: string;
    orden_Compra: string;
    sociedad: string;
    taxCode: string;
    tipoOrden: string;
    tipo_Doc: string;
}
