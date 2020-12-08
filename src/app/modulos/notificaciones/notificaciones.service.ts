import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { GlobalsComponent } from './../../compartidos/globals/globals.component';
import { StorageService } from '../../compartidos/login/storage.service';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { ParametrosSistema } from 'src/app/entidades/parametros-sistema';
import { Notificacion } from 'src/app/entidades/comunicado';

@Injectable()
export class NotificacionesService {
  header: HttpHeaders;

  constructor(
    private globalsComponent: GlobalsComponent
    , private sessionStr: StorageService
    , private _http: HttpClient2
  ) { }

  public ListaParametrosSistemaMX() {
    return this._http.get(this.globalsComponent.host_administracion + '/parametros_sistema');
  }

  public ObtenerListaParametrosSistemaMXPorCorporativo(identificador_corporativo: string) {
    return this._http.get(this.globalsComponent.host_administracion + '/parametros_sistema/' + identificador_corporativo + '/corporativo');
  }

  public ObtenerParametrosSistemaMXByid(identificador_sucursal: string) {
    return this._http.get(this.globalsComponent.host_administracion + '/parametros_sistema/' + identificador_sucursal + '/id');
  }

  public GuardarParametosSistemaMX(sucursal: ParametrosSistema) {
    return this._http.post(this.globalsComponent.host_administracion + '/parametros_sistema', sucursal);
  }

  public ActualizarParametrosSistemaMX(sucursal: ParametrosSistema) {
    return this._http.put(this.globalsComponent.host_administracion + '/parametros_sistema', sucursal);
  }

  public EnviarNotificacion(notificacion: Notificacion) {
    // http://localhost:6009/
    return this._http.post(`${this.globalsComponent.host_administracion}/notificaciones/enviar_notificacion_masiva`, notificacion);
  }

}



