import { Injectable } from '@angular/core';
import { Contribuyente } from 'src/app/entidades/contribuyente';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { Usuario } from 'src/app/entidades/usuario';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';

@Injectable({
  providedIn: 'root'
})
export class CodigosDeRecepcionService {

  public lista_contribuyentes = Array<Contribuyente>();
  private usuario = new Usuario();
  private endpintExterno: string;
  constructor(private _http: HttpClient2
    , private globalsComponent: GlobalsComponent
    , private sessionStr: StorageService) {
    this.usuario = this.sessionStr.loadSessionData();
  }

  public ObtenerListaSucursalesMX() {
    return this._http.get(this.globalsComponent.host_corporativo + '/sucursal/mx/corporativo');
  }

  public ObtenerListaContribuyentesMXPorCorporativo(identificador_corporativo: string) {
    return this._http.get(this.globalsComponent.host_corporativo + '/contribuyente/mx/' + identificador_corporativo + '/corporativo');
  }

  public ObtenerContribuyenteMXByid(identificador_contibuyente: string) {
    return this._http.get(this.globalsComponent.host_corporativo + '/contribuyente/mx/' + identificador_contibuyente);
  }

  public GuardarContribuyenteMX(contribuyente: Contribuyente) {
    return this._http.post(this.globalsComponent.host_corporativo + '/contribuyente/mx', contribuyente);
  }

  public ActualizarContibuyentelMX(contribuyente: Contribuyente) {
    return this._http.put(this.globalsComponent.host_corporativo + '/contribuyente/mx', contribuyente);
  }

  public obtenerContribuyentesMin(identificador_corporativo) {
    return this._http.get(`${this.globalsComponent.host_corporativo}/contribuyente/mx/${identificador_corporativo}/corporativo/min`);
  }
}
