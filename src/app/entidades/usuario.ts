import { CentroCostos } from './centro-costos';

export class Usuario {
  // id: Number;
  usuario_red: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  activo: Number;
  email: string;
  aprobador: number;
  ultima_actualizacion: string;
  identificador_usuario: string;
  identificador_corporativo: string;
  fecha_creacion: string;
  email_alterno: string;
  telefono: string;
  administrador_next: Number;
  proveedor: number;
  proveedor_id: number;
  corporativo_id: number;
  token: string;
  admin_basico: number;
  pais: string;
  password: string;
  usuarioDetalle: string;
  cc: CentroCostos[];
  id: number;
  identificador_proveedor: string;
  acreedor: number;
  reset_password: number;
  origen_portal: number;
  rfc: string;
  persona_fisica: number;
  descuento_pp: number;
  lista_negra: number;
  fecha_cierre: number; // 1 pueden cargar 0 no pueden cargar
  numero_proveedor: string;
  /* usuario RCI */
  numero_empleado: string;
  cuenta_distribucion: string;
  centro_costo: string;
  estatus: number;
  rol: string;
  identificador_jefe_inmediato: string;
  identificador_asistente: string;
  identificador_departamento: string;
  identificador_compania: string;
  identificador_centro_costo: string;
  jefe_inmediato: string;
  /* suplencia  */
  fecha_suplencia: string;
  comentario: string;
  identificador_usuario_creo: string;
  usuario_suplente: string;
  usuario_asiste: boolean;
  asistente: string;
  id_monto_caja_chica: number;
  monto_caja_chica: number;

  text: string;
}

class UsuarioDetalle {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  email: string;
  identificador_usuario: string;
  telefono: string;
  activo: number;
  administrador_next: number;
  provedor: number;
  provedor_id: number;
  corporativo_id: number;
  token: number;
  admin_basico: number;

  constructor() {
    this.nombre = '';
    this.apellido_paterno = '';
    this.apellido_materno = '';
    this.email = '';
    this.identificador_usuario = '';
    this.telefono = '';
    this.activo = 0;
    this.administrador_next = 0;
    this.provedor = 0;
    this.provedor_id = 0;
    this.corporativo_id = 0;
    this.token = 0;
    this.admin_basico = 0;
  }
}
