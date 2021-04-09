export class CabeceraFlujoAp {
  public id: number;
  public nombre: string;
  public descripcion: string;
  public id_tipo_documento: number;
  public id_tipo_gasto: number;
  public identificador_contribuyente: string;
  public identificador_sucursal: string;
  public identificador_centro_costos: string;
  public identificador_departamento: string;
  public identificador_corporativo: string;
  public niveles: Array<NivelAprobacion>;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.descripcion = '';
    this.id_tipo_documento = 0;
    this.id_tipo_gasto = 0;
    this.identificador_contribuyente = '';
    this.identificador_sucursal = '';
    this.identificador_centro_costos = '';
    this.identificador_departamento = '';
    this.identificador_corporativo = '';
    this.niveles = new Array<NivelAprobacion>();
  }
}


export class NivelAprobacion {
  public id: number;
  public id_flujo_aprobacion: number;
  public numero_nivel: number;
  public monedas: Array<Moneda>;
  public usuarios: Array<IdentificadorUsuario>;
  public monedas_edit: Array<Monedas>;
  public usuarios_edit: Array<Usuarios>;

  constructor() {
    this.id = 0;
    this.id_flujo_aprobacion = 0;
    this.numero_nivel = 0;
    this.monedas = new Array<Monedas>();
    this.usuarios = new Array<IdentificadorUsuario>();
  }
}


export class Moneda {
  public id_moneda: number;
  public id: number;
  public monto: number;
  public monto_disponible: number;

  constructor() {
    this.id = 0;
    this.id_moneda = 0;
    this.monto = 0;
    this.monto_disponible = 0;
  }
}

class Monedas {
  id: number;
  id_flujo_aprobacion_nivel: number;
  id_moneda: number;
  monto: number;
  monto_disponible: number;
  record_date: string;

  constructor() {
    this.id = 0;
    this.id_flujo_aprobacion_nivel = 0;
    this.id_moneda = 0;
    this.monto_disponible = 0;
    this.monto = 0;
    this.record_date = '';
  }

}

class Usuarios {
  id: number;
  id_flujo_aprobacion_nivel: number;
  identificador_usuario: string;
  record_date: string;

  constructor() {
    this.id = 0;
    this.id_flujo_aprobacion_nivel = 0;
    this.identificador_usuario = '';
    this.record_date = '';
  }
}

export class IdentificadorUsuario {
  public identificador_usuario: string;

  constructor() {
    this.identificador_usuario = '';
  }
}

export class AccionAprobar {
  id_solicitud: number;
  identificador_aprobador: string;
  tipo_gasto: number;
  comentario: string;
  comentario_rechazo: string;
  comentario_aprobacion: string;
  documento_id: number;
  tipo_documento: number;

  constructor() {
    this.id_solicitud = 0;
    this.identificador_aprobador = '';
    this.tipo_gasto = 0;
    this.comentario_rechazo = '';
    this.comentario_aprobacion = '';
    this.documento_id = 0;
    this.tipo_documento = 0;
  }
}
