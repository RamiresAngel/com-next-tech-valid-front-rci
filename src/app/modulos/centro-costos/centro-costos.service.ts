import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CentroCostos } from '../../entidades/centro-costos';
import { GlobalsComponent } from './../../compartidos/globals/globals.component';
import { Usuario } from '../../entidades/usuario';
import { StorageService } from '../../compartidos/login/storage.service';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';


@Injectable({
  providedIn: 'root'
})
export class CentroCostosService {

  private usuario = new Usuario();
  private endpintExterno: string;
  constructor(private _http: HttpClient2
    , private globalsComponent: GlobalsComponent
    , private sessionStr: StorageService) {
    this.usuario = this.sessionStr.loadSessionData();
  }

  public ObtenerListaCentroCostosMX() {
    return this._http.get(this.globalsComponent.host_corporativo + '/centro_consumo_costo');
  }

  public ObtenerListaCentroCostosMXPorCorporativo(identificador_corporativo: string, id_user: string, id_rol: number) {
    return this._http.get(`${this.globalsComponent.host_corporativo}/centro_consumo_costo/${identificador_corporativo}/corporativo`);
    // return this._http.get(`${this.globalsComponent.host_corporativo}/centro_consumo_costo/${identificador_corporativo}/corporativo/${id_user}/usuario/${id_rol}/rol`);
  }
  public ObtenerListaCentroCostosMXPorCorporativoAdmin(identificador_corporativo: string) {
    return this._http.get(`${this.globalsComponent.host_corporativo}/centro_consumo_costo/${identificador_corporativo}/corporativo`);
  }

  public ObtenerCentroCostosMXByid(identificador_sucursal: string) {
    return this._http.get(this.globalsComponent.host_corporativo + '/centro_consumo_costo/' + identificador_sucursal);
  }

  public GuardarCentroCostosMX(sucursal: CentroCostos) {
    return this._http.post(this.globalsComponent.host_corporativo + '/centro_consumo_costo', sucursal);
  }

  public ActualizarCentroCostosMX(sucursal: CentroCostos) {
    return this._http.put(this.globalsComponent.host_corporativo + '/centro_consumo_costo', sucursal);
  }


}
