import { Injectable } from '@angular/core';
import { Buzon } from 'src/app/entidades/buzon';
import { GlobalsComponent } from './../../compartidos/globals/globals.component';
import { StorageService } from '../../compartidos/login/storage.service';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionBuzonService {
  public buzon: Buzon;

  constructor(
    private _http: HttpClient2
    , private globalsComponent: GlobalsComponent
    , private sessionStr: StorageService
  ) { }
  /**
    * Método para obtener las sucursales de México,
    * borrar.
  */
  public ObtenerListaBuzonesMX() {
    // this.globalsComponent.host
    return this._http.get(this.globalsComponent.host_administracion + '/configuracion_buzon');
  }

  public ObtenerListaBuzonesMXPorCorporativo(identificador_corporativo: string) {
    return this._http.get(this.globalsComponent.host_administracion + '/configuracion_buzon/' + identificador_corporativo + '/corporativo');
  }

  public GuardarBuzonlMX(buzon: Buzon) {
    return this._http.post(this.globalsComponent.host_administracion + '/configuracion_buzon', buzon);
  }

}
