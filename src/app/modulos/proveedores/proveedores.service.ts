import { Injectable } from '@angular/core';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { HttpHeaders } from '@angular/common/http';
import { ProveedorMin, Proveedor } from 'src/app/entidades/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  header: HttpHeaders;
  constructor(
    private globalsComponent: GlobalsComponent
    , private _http: HttpClient2
  ) { }

  public ObtenerListaProveedoresMX() {
    return this._http.get(this.globalsComponent.host_corporativo + '/proveedor/corporativo/min');
  }

  public ObtenerListaProveedoresPorCorporativo(identificador_corporativo: string, filtro: any) {
    return this._http.post(this.globalsComponent.host_corporativo + '/proveedor/' + identificador_corporativo + '/corporativo', filtro);
  }

  public ObtenerListaProveedoresPorCorporativoMin(identificador_corporativo: string) {
    return this._http.get(this.globalsComponent.host_corporativo + '/proveedor/' + identificador_corporativo + '/corporativo/min');
  }

  public ObtenerProveedorMXByid(id_proveedor: string) {
    return this._http.get(`${this.globalsComponent.host_corporativo}/proveedor/id/${id_proveedor}`);
  }

  // Obtener la relacion de acreedores FACTO con empresas (contribuyentes)
  public ObtenerRelAcreedorEmpresas(id_proveedor: string) {
    return this._http.get(`${this.globalsComponent.host_corporativo}/acreedor/acreedor_empresa/${id_proveedor}/proveedor`);
  }

  public GuardarProveedoreMX(sucursal: any) {
    return this._http.post(this.globalsComponent.host_corporativo + '/proveedor/', sucursal);
  }

  public ActualizarProveedorById(proveedor: ProveedorMin) {
    return this._http.put(this.globalsComponent.host_corporativo + '/proveedor/', proveedor);
  }

  public getListaEstatusProveedores() {
    return this._http.get(this.globalsComponent.host_corporativo + '/estatus/proveedor/');
  }

  // GET Listar relación Acreedor departamento-proveedor por identificador proveedor
  public getListaDepartamentosProveedores(identificador_proveedor: string) {
    return this._http.get(this.globalsComponent.host_corporativo + '/acreedor/acreedor_departamento/' + identificador_proveedor + '/proveedor');
  }

  // POST Añadir relación Acreedor departamento-proveedor
  public GuardarProveedorDepartamento(relacion: any) {
    return this._http.post(this.globalsComponent.host_corporativo + '/acreedor/acreedor_departamento/', relacion);
  }

  // POST Añadir relación contribuyente EMPRESA
  public GuardarContribuyenteEmpresa(relacion: any) {
    return this._http.post(this.globalsComponent.host_corporativo + '/acreedor/acreedor_empresa/', relacion);
  }


  // GET Listar relación Acreedor departamento-proveedor por identificador proveedor
  public guardarTipoGastoProveedor(tipo_gasto_proveedor) {
    return this._http.post(this.globalsComponent.host_corporativo + '/acreedor/acreedor_tipo_gasto', tipo_gasto_proveedor);
  }
  // GET Listar relación Acreedor departamento-proveedor por identificador proveedor
  public getListaTipoGastoProveedores(identificador_proveedor) {
    return this._http.get(`${this.globalsComponent.host_corporativo}/acreedor/acreedor_tipo_gasto/${identificador_proveedor}/proveedor`);
  }

  // GET Listar relación Acreedor cuenta-proveedor
  public getListaRelacionCuentaProveedor(identificador_proveedor: string) {
    return this._http.get(this.globalsComponent.host_corporativo + '/acreedor/acreedor_cuenta/' + identificador_proveedor + '/proveedor');
  }

  // POST Añadir relación acreedor_cuenta-proveedor
  public guardarProveedorCuentas(proveedor: any) {
    return this._http.post(this.globalsComponent.host_corporativo + '/acreedor/acreedor_cuenta', proveedor);

  }

}
