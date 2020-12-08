import { Injectable } from '@angular/core';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { HttpHeaders } from '@angular/common/http';
import { ProveedorMin, Proveedor } from 'src/app/entidades/proveedor';

@Injectable({
  providedIn: 'root'
})
export class UsuarioProveedorService {
  header: HttpHeaders;
  constructor(
    private globalsComponent: GlobalsComponent
    , private _http: HttpClient2
  ) { }

  public ObtenerListaProveedoresPorCorporativo(identificador_corporativo: string, filtro: any) {
    return this._http.post(`${this.globalsComponent.host_corporativo}/usuario/${identificador_corporativo}/proveedores`, filtro);
  }

  public ObtenerProveedorMXByidentificador(id_proveedor: string) {
    return this._http.get(`${this.globalsComponent.host_corporativo}/usuario/proveedor/${id_proveedor}`);
  }
  public ObtenerProveedorMXCorporativoIDMin(identificador_corporativo: string) {
    return this._http.get(`${this.globalsComponent.host_corporativo}/proveedor/${identificador_corporativo}/corporativo/min`);
  }
  public ObtenerProveedorMXContribuyenteIDMin(identificador_corporativo: string, identificador_contribuyente: string) {
    return this._http.get(`${this.globalsComponent.host_corporativo}/proveedor/${identificador_corporativo}/corporativo/${identificador_contribuyente}/contribuyente/min`);
  }

  public GuardarProveedoreMX(proveedor: any) {
    return this._http.post(`${this.globalsComponent.host_corporativo}/acreedor`, proveedor);
  }

  public ActualizarProveedorById(proveedor: any) {
    return this._http.put(this.globalsComponent.host_corporativo + '/acreedor/', proveedor);
  }
  public ActualizarProveedorSAPById(proveedor: any) {
    return this._http.put(this.globalsComponent.host_corporativo + '/usuario/proveedor/actualizar', proveedor);
  }
  public crearUsuarioProveedor(usuario: any) {
    // return this._http.post('http://10.10.5.88:5000/api/v1/validm/corporativo/proveedor', usuario);
    return this._http.post(this.globalsComponent.host_corporativo + '/proveedor', usuario);
  }
  public crearProveedorCS(usuario: any) {
    return this._http.post(this.globalsComponent.host_corporativo + '/proveedor/carga_simple', usuario);
  }

  // actualiza usuarios proveedor del sistema ( carga simple )
  public actualizarProveedorCS(usuario_proveedor) {
    return this._http.put(this.globalsComponent.host_corporativo + '/proveedor/carga_simple', usuario_proveedor);
  }

}
