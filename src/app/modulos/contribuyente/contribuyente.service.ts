import { Injectable } from '@angular/core';
import { Contribuyente } from 'src/app/entidades/contribuyente';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { Usuario } from 'src/app/entidades/usuario';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';

@Injectable({
  providedIn: 'root'
})
export class ContribuyenteService {

  host: string;
  public lista_contribuyentes = Array<Contribuyente>();
  private usuario = new Usuario();
  private endpintExterno: string;
  constructor(private _http: HttpClient2
    , private globalsComponent: GlobalsComponent
    , private sessionStr: StorageService) {
    this.usuario = this.sessionStr.loadSessionData();
    this.host = this.globalsComponent.host;
  }

  public ObtenerListaContribuyentesMXPorCorporativo(identificador_corporativo: string, id_user: string, id_rol: number) {
    return this._http.get(this.globalsComponent.host_corporativo + '/contribuyente/mx/' + identificador_corporativo + '/corporativo'
      // + identificador_corporativo + '/corporativo' + `/${id_user}/usuario/${id_rol}/rol`
    );
  }
  public ObtenerContribuyentesProveedorNoERP(identificador_proveedor: string) {
    return this._http.get(this.globalsComponent.host_corporativo + `/acreedor/contribuyenteby/${identificador_proveedor}/proveedor`);
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

  // public obtenerContribuyentesMin(identificador_corporativo) {
  //   return this._http.get(`${this.globalsComponent.host_corporativo}/contribuyente/mx/${identificador_corporativo}/corporativo/min`);
  // }

  public obtenerContribuyentesMin(identificador_corporativo: string, id_user: string, id_rol: number) {
    return this._http.get(this.globalsComponent.host_corporativo + '/contribuyente/mx/'
      + identificador_corporativo + '/corporativo/min' + `/${id_user}/usuario/${id_rol}/rol`
    );
  }
  public obtenerContribuyentesMinSinRol(identificador_corporativo: string, id_user: string, id_rol: number) {
    return this._http.get(this.globalsComponent.host_corporativo + '/contribuyente/mx/'
      + identificador_corporativo + '/corporativo/min'
    );
  }

  public getComprobacionbyNumero(identificador_contribuyente: string, numero_solicitud: string, usuario_identificador: string) {
    const obj = {
      contributente_identificador: identificador_contribuyente,
      numero_anticipo_sap: numero_solicitud,
      usuario_identificador: usuario_identificador
    };
    return this._http.post(`${this.globalsComponent.host_documentos}/comprobacion_by_numero`, obj);
  }

  public obtenerUsuarioCuentas_by(identificador_contribuyente: string, tipoGasto: number, identificador_proveedor: string) {
    // tslint:disable-next-line:max-line-length
    return this._http.get(`${this.globalsComponent.host_corporativo}/usuario/cuentas_by/${identificador_contribuyente}/contribuyente/${tipoGasto}/tipo_gasto/${identificador_proveedor}/proveedor`);
  }

  public obtenerUsuarioCuentas_byProrrateo(identificador_contribuyente: string, tipoGasto: number, identificador_proveedor: string) {
    // tslint:disable-next-line:max-line-length
    return this._http.get(`${this.globalsComponent.host_corporativo}/usuario/cuentas_prorrateo_by/${identificador_contribuyente}/contribuyente/${tipoGasto}/tipo_gasto/${identificador_proveedor}/proveedor`);
  }

  public obtenerDepartamentoProrrateo(identificador_cuenta: string, identificador_contribuyente: string, tipoGasto: number, identificador_proveedor: string) {
    // tslint:disable-next-line:max-line-length
    return this._http.get(`${this.globalsComponent.host_corporativo}/usuario/deptos_prorrateo_by/${identificador_cuenta}/cuenta_identificador/${identificador_contribuyente}/contribuyente/${tipoGasto}/tipo_gasto/${identificador_proveedor}/proveedor`);
  }
  public obtenerDepartamentoProrrateoArrayCuentas(identificador_contribuyente: string, tipoGasto: number, identificador_proveedor: string, cuentas: any[], identificador_sucursal) {
    // tslint:disable-next-line:max-line-length
    return this._http.post(`${this.globalsComponent.host_corporativo}/usuario/deptos_prorrateo_by/${identificador_contribuyente}/contribuyente/${tipoGasto}/tipo_gasto/${identificador_proveedor}/proveedor/${identificador_sucursal}/sucursal`, cuentas); // return this._http.get(`${this.globalsComponent.host_corporativo}/usuario/deptos_prorrateo_by/${identificador_cuenta}/cuenta_identificador/${identificador_contribuyente}/contribuyente/${tipoGasto}/tipo_gasto/${identificador_proveedor}/proveedor`);
  }
}

