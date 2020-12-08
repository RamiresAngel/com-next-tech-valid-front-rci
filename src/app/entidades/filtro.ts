export class Filtro {
  public fecha_emision: string;
  public fecha_creacion: string;
  public cedula_emisor: string;
  public cedula_receptor: string;
  public nombre_receptor: string;
  public centrosconsumo: string;
  public razon_social: string;
  public clave: string;
  public tipoDte: string;
  public moneda: string;
  public estatus_acuse: string;
  public estatus_dgt: string;
  public estatusNegocio: string;
  public listtype: string;
  public centro_consumo_id: number[];
  public tipo: string;
  public corporativo_id: number;
  public sucursal_id: number;
  public centro_consumo: number;

  constructor() {
    this.fecha_emision = '';
    this.fecha_creacion = '';
    this.cedula_emisor = '';
    this.razon_social = '';
    this.clave = '';
    this.tipoDte = '';
    this.moneda = '';
    this.estatus_acuse = '';
    this.estatus_dgt = '';
    this.estatusNegocio = '';
    this.listtype = '';
    this.centro_consumo_id = [];
    this.tipo = '';
    this.cedula_receptor = '';
    this.centrosconsumo = '';
    this.nombre_receptor = '';
    this.corporativo_id = 0;
    this.sucursal_id = 0;
    this.centro_consumo = 0;
  }
}

export class FiltroProveedor {
  public nombre: string;
  public numero_proveedor: string;
  public rfc: string;
  public correo: string;
  public sitio: string;
  public moneda: string;
  public estatus: number;
  public listtype: string;
  public identificador_corporativo: string;

  constructor() {
    this.nombre = "";
    this.numero_proveedor = "";
    this.rfc = "";
    this.correo = "";
    this.sitio = "";
    this.moneda = "";
    this.estatus = 0;
    this.listtype = "";
    this.identificador_corporativo = "";
  }
}

export class FiltroSaldos {
  identificador_corporativo: string;
  Sociedad: string;
  No_Proveedor: string;
  Fecha_Inicio: string;
  Fecha_Fin: string;
  buscando: boolean;

  constructor() {
    this.identificador_corporativo = '';
    this.Sociedad = '';
    this.No_Proveedor = '';
    this.Fecha_Inicio = '';
    this.Fecha_Fin = '';
    this.buscando = false;
  }
}
