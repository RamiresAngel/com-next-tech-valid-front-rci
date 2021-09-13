export class CargoNoDedusible {
  public cfdi_id: number;
  public pdf: string;
  public xml: string;
  public identificador_corporativo: string;
  public identificador_sucursal: string;
  public identificador_proveedor: string;
  public tipo_movimiento: number;
  public monto_solicitud: number;
  public monto_no_deducible: number;
  public identificador_cuenta: string;
  public guardar: number;
  public cuentas_prorrateo: Array<CuentasProrateo>;
  public identificador_departamento: string;
  public preliminar_id: number;
  public identificador_contribuyente: string;
  public id_cuenta_agrupacion: number;
  public descripcion_cuenta: string;
  public ceco: string;
  public prorrateo: number;
  public moneda: string;
}

export class CuentasProrateo {
  // public identificador_cuenta: string;
  // public identificador_departamento: string;
  // public monto_otorgado: number;
  public preliminar_detalle_id: number;
  public identificador_cuenta_agrupacion: string;
  public ceco: string;
  public importe_asignado: number;
  public porcentaje_asignado: number;
  public id_cuenta_agrupacion: number;
  // "preliminar_detalle_id": 0,
  // 			"identificador_cuenta_agrupacion":  "",
  // 			"ceco": "",
  // 			"importe_asignado": 10.00,
  //       "porcentaje_asignado": 10
}
