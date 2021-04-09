import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { SucursalMx } from '../../entidades/sucursal-mx';
import { GlobalsComponent } from './../../compartidos/globals/globals.component';
import { StorageService } from '../../compartidos/login/storage.service';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { ConfiguracionBuzzon } from 'src/app/entidades';

@Injectable()
export class SucursalService {
  header: HttpHeaders;
  host: string;
  constructor(
    private globalsComponent: GlobalsComponent
    , private sessionStr: StorageService
    , private _http: HttpClient2
  ) {
  }
  public ObtenerListaSucursalesMX() {
    return this._http.get(this.globalsComponent.host_corporativo + '/sucursal/mx/');
  }

  public ObtenerListaSucursalesMXPorCorporativo(identificador_corporativo: string, identificador_usuario: string, rol_identificador: number) {
    return this._http.get(this.globalsComponent.host_corporativo + '/sucursal/mx/' + identificador_corporativo + '/corporativo');
    // + identificador_usuario + '/usuario/' + rol_identificador + '/rol' );
  }
  public ObtenerSucursalesCorporativoMin(identificador_corporativo: string) {
    return this._http.get(`${this.globalsComponent.host_corporativo}/sucursal/mx/${identificador_corporativo}/corporativo/min`);
  }

  public ObtenerSucursalMXByid(identificador_sucursal: string) {
    return this._http.get(`${this.globalsComponent.host_corporativo}/sucursal/mx/${identificador_sucursal}/id `);
  }

  public GuardarSucursalMX(sucursal: SucursalMx) {
    return this._http.post(this.globalsComponent.host_corporativo + '/sucursal/mx/', sucursal);
  }

  public ActualizarSucursalMX(sucursal: SucursalMx) {
    return this._http.put(this.globalsComponent.host_corporativo + '/sucursal/mx/', sucursal);
  }

  public guardarConfiguracionBuzon(configuracion_buzon: ConfiguracionBuzzon) {
    return this._http.post(`${this.globalsComponent.host_corporativo}/configuracion_buzon_sucursal`, configuracion_buzon);
  }
  public actualizarConfiguracionBuzon(configuracion_buzon: ConfiguracionBuzzon) {
    return this._http.put(`${this.globalsComponent.host_corporativo}/configuracion_buzon_sucursal`, configuracion_buzon);
  }
  public obtenerConfiguracionBuzon(identificador_sucursal: String) {
    return this._http.get(`${this.globalsComponent.host_corporativo}/configuracion_buzon_sucursal/${identificador_sucursal}/sucursal`);
  }
}
