import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { GlobalsComponent } from './../../compartidos/globals/globals.component';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { CabeceraFlujoAp, NivelAprobacion } from 'src/app/entidades/flujo-aprobacion';

@Injectable()
export class FlujoAprobacionService {
  header: HttpHeaders;
  constructor(
    private globalsComponent: GlobalsComponent
    , private _http: HttpClient2
  ) { }

  public ObtenerListaFlujosMX() {
    return this._http.get(this.globalsComponent.host_administracion + '/solicitud_aprobacion/');
  }

  public ObtenerListaFlujosMXPorCorporativo(identificador_corporativo: string, id_user: string, id_rol: number) {
    return this._http.get(`${this.globalsComponent.host_administracion}/solicitud_aprobacion/${identificador_corporativo}/corporativo/${id_user}/usuario/${id_rol}/rol`);
    // return this._http.get(this.globalsComponent.host_administracion + '/solicitud_aprobacion/' + identificador_corporativo + '/corporativo');
  }

  public GuardarCabeceraFlujoApMX(cabecera_flujo: CabeceraFlujoAp) {
    return this._http.post(this.globalsComponent.host_administracion + '/solicitud_aprobacion/', cabecera_flujo);
  }

  public ActualizarCabeceraFlujoApMX(cabecera_flujo: CabeceraFlujoAp) {
    return this._http.put(this.globalsComponent.host_administracion + '/solicitud_aprobacion/', cabecera_flujo);
  }

  public GuardarNivelAprobacionMX(nibel_aprobacion: NivelAprobacion) {
    return this._http.post(this.globalsComponent.host_administracion + '/solicitud_aprobacion/nivel/', nibel_aprobacion);
  }

  public EliminarNivelAprobacionMX(id_nivel: number) {
    return this._http.delete(this.globalsComponent.host_administracion + '/solicitud_aprobacion/' + id_nivel + '/child/delete');
  }

  public ActualizarSucursalMX(cabecera_flujo: CabeceraFlujoAp) {
    return this._http.put(this.globalsComponent.host_administracion + '/solicitud_aprobacion/', cabecera_flujo);
  }

  public ObtenerFlujoMXByid(id_flujo: number) {
    return this._http.get(this.globalsComponent.host_administracion + '/solicitud_aprobacion/' + id_flujo + '/complete/');
  }



}
