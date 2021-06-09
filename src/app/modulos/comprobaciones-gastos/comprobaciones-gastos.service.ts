import { filtroComprobacionGastos } from './../../entidades/filtroComprobacionGastos';
import { ComprobacionGastosHeader } from 'src/app/entidades/ComprobacionGastosHeader';
import { HttpClient2 } from './../../compartidos/servicios_compartidos/http-clien.service';
import { GlobalsComponent } from './../../compartidos/globals/globals.component';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TipoGastoComprobacion } from 'src/app/entidades/comprobacion';

@Injectable({
  providedIn: 'root'
})
export class ComprobacionesGastosService {
  lista_cuentas: any;
  lista_cuentas$ = new Subject<TipoGastoComprobacion[]>();
  lista_monedas: any;
  lista_moneda$ = new Subject<any[]>();

  constructor(
    private globals: GlobalsComponent,
    private http: HttpClient2
  ) { }

  setCuentas(cuentas: TipoGastoComprobacion[]) {
    this.lista_cuentas = cuentas;
    this.lista_cuentas$.next(this.lista_cuentas);
  }
  setcatalogoMonedas(monedas: any[]) {
    this.lista_monedas = monedas;
    this.lista_moneda$.next(this.lista_monedas);
  }

  getListaCuentas(): Observable<TipoGastoComprobacion[]> {
    return this.lista_cuentas$.asObservable();
  }
  getListaMonedas(): Observable<any[]> {
    return this.lista_moneda$.asObservable();
  }

  public obtenerDetallesXML(xml: { xml: string }) {
    return this.http.post(`${this.globals.host_documentos}/xml_detalles`, xml);
  }

  getDatosIdCorporatico(id_corporativo: string) {
    console.log(`Api para consumir por el ${id_corporativo} `);
    return this.http.get('');
  }

  guardarHeaderComprobacion(header: ComprobacionGastosHeader) {
    return this.http.post(`${this.globals.host_gastos_viaje}/comprobacion/cabecera`, header);
  }
  updateHeaderComprobacion(header: ComprobacionGastosHeader) {
    return this.http.put(`${this.globals.host_gastos_viaje}/comprobacion/cabecera`, header);
  }
  listarComprobaciones(filtro: filtroComprobacionGastos) {
    const aux_filtro = {
      estatus_id: Number(filtro.estatus),
      estatus: filtro.activo,
      fecha_fin: filtro.fecha_fin,
      fecha_inicio: filtro.fecha_inicio,
      folio_comprobacion: Number(filtro.folio_comprobacion),
      identificador_cc: filtro.identificador_cc,
      identificador_contribuyente: filtro.identificador_contribuyente,
      identificador_corporativo: filtro.identificador_corporativo,
      identificador_usuario: filtro.identificador_usuario,
      tipo_gasto: filtro.tipo_gasto,
    };
    return this.http.post(`${this.globals.host_gastos_viaje}/comprobacion/cabecera/list`, aux_filtro);
  }
  obtenerComprobacionId(id_comprobacion: ComprobacionGastosHeader, aprobador = 0) {
    return this.http.get(`${this.globals.host_gastos_viaje}/comprobacion/cabecera/${id_comprobacion}/folio_comprobacion/${aprobador}/aprobador`);
  }

  eliminarComprobacion(id_comprobacion: number) {
    return this.http.delete(`${this.globals.host_gastos_viaje}/comprobacion/cabecera/${id_comprobacion}/folio_comprobacion`);
  }
  obtenerHeaderBorrador(folio_comprobacion: number, aprobador = 0, identificador_usuario: string = '') {
    return this.http.get(`${this.globals.host_gastos_viaje}/comprobacion/cabecera/${folio_comprobacion}/folio_comprobacion/${aprobador}/aprobador/${identificador_usuario}/identificador_usuario`);
  }
  obtenerHeaderComprobantes(folio_comprobacion: number) {
    return this.http.get(`${this.globals.host_gastos_viaje}/comprobacion/comprobantes/${folio_comprobacion}/folio_comprobacion`);
  }
  obtenerHeaderConceptos(documento_id: number) {
    return this.http.get(`${this.globals.host_gastos_viaje}/comprobacion/conceptos/${documento_id}/id_documento`);
  }
  eliminarComprobante(preliminar_id: number, documento_id: number, preliminar_detalle_id: number) {
    return this.http.delete(`${this.globals.host_gastos_viaje}/comprobacion/linea/${preliminar_id}/id_preliminar/${documento_id}/documento_cdfi_id/${preliminar_detalle_id}/preliminar_detalle_id`);
  }
  getUsuarioByAsistente(usuario_asistente: string) {
    return this.http.get(`${this.globals.host_corporativo}/usuario/${usuario_asistente}/asistente`);
  }
  getCCJefeInmediato(jefe_inmediato: string) {
    return this.http.get(`${this.globals.host_corporativo}/centroconsumo_usuario/jefe_inmediato/${jefe_inmediato}/identificador_usuario`);
  }
  getMontosDisponibles(id_prestacion: number, identificador_usuario: string) {
    return this.http.get(`${this.globals.host_gastos_viaje}/prestaciones/saldo/${id_prestacion}/id_prestacion/${identificador_usuario}/identificador_usuario`);
  }

  reporteComprobaciones(filtro: filtroComprobacionGastos) {
    const aux_filtro = {
      estatus_id: Number(filtro.estatus),
      estatus: filtro.activo,
      fecha_fin: filtro.fecha_fin,
      fecha_inicio: filtro.fecha_inicio,
      folio_comprobacion: Number(filtro.folio_comprobacion),
      identificador_cc: filtro.identificador_cc,
      identificador_contribuyente: filtro.identificador_contribuyente,
      identificador_corporativo: filtro.identificador_corporativo,
      identificador_usuario: filtro.identificador_usuario,
      tipo_gasto: filtro.tipo_gasto,
    };
    return this.http.post(`${this.globals.host_gastos_viaje}/comprobacion/reporte/list`, aux_filtro);
  }
  getListarReporte(filtro: filtroComprobacionGastos) {
    return this.http.post(`${this.globals.host_gastos_viaje}/comprobacion/reporte`, filtro);
  }
  getAprobadoresPrestacion(identificador_compania: string) {
    return this.http.get(`${this.globals.host_gastos_viaje}/prestaciones/aprobador/${identificador_compania}/identificador_compania`);
  }
  obtenerConsecutivoComprobantePapel(identificador_usuario) {
    return this.http.get(`${this.globals.host_gastos_viaje}/comprobacion/folio_consecutivo/${identificador_usuario}/identificador_usuario`);
  }

}
