import { Injectable } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { FiltroGastosViaje, AprobacionRequest } from 'src/app/entidades';

@Injectable({
  providedIn: 'root'
})
export class GastosViajeService {

  constructor(
    private globalsComponent: GlobalsComponent,
    private sessionStr: StorageService,
    private _http: HttpClient2
  ) { }

  public crearSolicitud(solicitud) {
    return this._http.post(this.globalsComponent.host_gastos_viaje + '/solicitud', solicitud);
  }
  public crearSolicitudAnticipo(solicitud) {
    return this._http.post(this.globalsComponent.host_gastos_viaje + '/solicitud/anticipo', solicitud);
  }

  public listarSolicitudes(filtro: FiltroGastosViaje) {
    return this._http.post(this.globalsComponent.host_gastos_viaje + '/list', filtro);
  }
  public listarSolicitudesAprobador(filtro: FiltroGastosViaje) {
    return this._http.post(this.globalsComponent.host_gastos_viaje + '/list/aprobador', filtro);
  }

  public getPendientesComprobar(id: number) {
    return this._http.post(this.globalsComponent.host_gastos_viaje + '/solicitudes/pendientes', { id });
  }

  public aprobarSolicitud(solicitud: AprobacionRequest) {
    return this._http.post(`${this.globalsComponent.host_gastos_viaje}/solicitud/aprobar`, solicitud);
  }
  public rechazarSolicitud(solicitud: AprobacionRequest) {
    return this._http.post(`${this.globalsComponent.host_gastos_viaje}/solicitud/rechazar`, solicitud);
  }
  public getCuentasContribuyenteSucursal(identificador_contribuyente: string, identificador_sucursal: string, identificador_departamento: string) {
    return this._http.get(`${this.globalsComponent.host_gastos_viaje}/cuenta/${identificador_contribuyente}/contribuyente/${identificador_sucursal}/sucursal/${identificador_departamento}/departamento`);
  }

  // Comprobaciones
  public aprobarComprobacion(solicitud: AprobacionRequest) {
    return this._http.post(`${this.globalsComponent.host_gastos_viaje}/comprobacion/aprobar`, solicitud);
  }
  public rechazarComprobacion(solicitud: AprobacionRequest) {
    return this._http.post(`${this.globalsComponent.host_gastos_viaje}/comprobacion/rechazar`, solicitud);
  }
  public validarSolicitud(numero_solicitud: string) {
    return this._http.get(this.globalsComponent.host_gastos_viaje + `/solicitud/${numero_solicitud}/numero_solicitud`);
  }
  public listarComprobaciones(filtro: FiltroGastosViaje) {
    return this._http.post(this.globalsComponent.host_documentos + '/gastos/list', filtro);
  }
  public listarComprobacionesAprobador(filtro: FiltroGastosViaje) {
    return this._http.post(this.globalsComponent.host_documentos + '/gastos/list', filtro);
    // return this._http.post(this.globalsComponent.host_documentos + '/list/aprobador', filtro);
  }

  public listarComprobacionesAdm(filtro: FiltroGastosViaje) {
    return this._http.post(this.globalsComponent.host_gastos_viaje + '/list', filtro);
  }

  public crearComprobacion(comprobacion) {
    return this._http.post(this.globalsComponent.host_gastos_viaje + '/factura_nacional', comprobacion);
  }

  public crearComprobacionExt(comprobacion) {
    return this._http.post(this.globalsComponent.host_gastos_viaje + '/factura_extranjera/add', comprobacion);
  }

  // Validar factura - Solicitud Nacional
  public getConceptosFactura(base64_xml) {
    return this._http.post(this.globalsComponent.host_gastos_viaje + '/previsualizar/factura', { xml: base64_xml });
  }
  // Obtener totoal comprobaciones
  public getTotalComprobados(id_solicitud) {
    return this._http.get(this.globalsComponent.host_gastos_viaje + `/totales_comprobados/${id_solicitud}/solicitud`);
  }

  // Agregar Arreglo de comprobaciones tanto nacionales como internacionales diferenciados por la bandera nacional = 1 para nacional
  public agregarComprobaciones(lista_comprobaciones) {
    return this._http.post(this.globalsComponent.host_gastos_viaje + '/comprobaciones', lista_comprobaciones);
  }


  obtenerDocumentosIdSolicitud(id_solicitud: number) {
    return this._http.get(this.globalsComponent.host_gastos_viaje + `/files/${id_solicitud}/solicitud`);
  }
  obtenerDetallesComprobacion(id_solicitud: number) {
    return this._http.get(this.globalsComponent.host_gastos_viaje + `/files/${id_solicitud}/solicitud`);
  }


  obtenerPoliticasViaje(identificador_corporativo: string) {
    return this._http.get(this.globalsComponent.host_gastos_viaje + `/politicas/${identificador_corporativo}/corporativo`);
  }

  obtenerDetallesAprobacion(id, tipo_gasto) {
    return this._http.get(this.globalsComponent.host_documentos + `/gastos/conceptos/list/${id}/preliminar`);
  }
  obtenerConceptosDocumento(id) {
    return this._http.get(this.globalsComponent.host_documentos + `/gastos/conceptos/list/${id}/preliminar`);
  }

}
