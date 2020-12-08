import { Injectable } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { CajaChica } from 'src/app/entidades/caja-chica';

@Injectable({
  providedIn: 'root'
})
export class CajaChicaService {

  constructor(
    private globalsComponent: GlobalsComponent,
    private sessionStr: StorageService,
    private _http: HttpClient2
  ) { }

  public ObtenerListaLibroCajaChica() {
    return this._http.get(`${this.globalsComponent.host_administracion}/libro_caja_chica/`);
  }

  public ObtenerListaContribuyentesMXPorCorporativo(identificador_corporativo: string, identificador_usuario: string) {
    return this._http.get(this.globalsComponent.host_corporativo + '/usuario/contribuyentes/corporativo/contribuyente/mx/'
      + identificador_corporativo + '/corporativo/' + + '/usuario');
  }

  public ObtenerListaSucursalesMXPorCorporativo(identificador_corporativo: string) {
    return this._http.get(this.globalsComponent.host_corporativo + '/sucursal/mx/' + identificador_corporativo + '/corporativo');
  }

  public obtenerMonedas() {
    return this._http.get(this.globalsComponent.host_administracion + '/cat_moneda/');
  }

  public obtenerListadoSolicitudGeneral() {
    return this._http.get(this.globalsComponent.host + '');
  }

  public actualizaCajaChica(cajaChica: CajaChica) {
    return this._http.post(this.globalsComponent.host + '', cajaChica);
  }

  public guardarSolicitudCC(solicitudCC: CajaChica) {
    return this._http.post(this.globalsComponent.host_documentos + '/solicitud/caja_chica', solicitudCC);
  }
  public actualizaSolicitudCC(solicitudCC: CajaChica) {
    return this._http.put(this.globalsComponent.host + '', solicitudCC);
  }
}
