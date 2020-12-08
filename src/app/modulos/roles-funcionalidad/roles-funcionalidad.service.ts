import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { GlobalsComponent } from './../../compartidos/globals/globals.component';
import { StorageService } from './../../compartidos/login/storage.service';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { Rol } from 'src/app/entidades/rol';
import { RolFuncionalidad } from 'src/app/entidades/rol-funcionalidad';


@Injectable()
export class RolesFuncionalidadService {

  header: HttpHeaders;
  constructor(
    private globalsComponent: GlobalsComponent,
    private sessionStr: StorageService,
    private _http: HttpClient2
  ) { }
  /**
   * Método para obtener las Roles de México,
   * borrar.
   */
  public ObtenerListaRolesFuncionalidadMX() {
    return this._http.get(
      this.globalsComponent.host_corporativo + '/rol_funcionalidad'
    );
  }

  public ObtenerListaRolesFuncionalidaMXPorCorporativo(identificador_corporativo: string) {
    return this._http.get(this.globalsComponent.host_corporativo + '/rol_funcionalidad/' + identificador_corporativo + '/corporativo');
  }

  public ObtenerRolFuncionalidadMXByidRol(id_rol: number) {
    return this._http.get(
      this.globalsComponent.host_corporativo + '/rol_funcionalidad/' + id_rol + '/id');
  }

  public GuardarRolFuncionalidadMX(rol_funcionalidad: RolFuncionalidad) {
    return this._http.post(this.globalsComponent.host_corporativo + '/rol_funcionalidad/', rol_funcionalidad);
  }

  public ActualizarRolFuncionalidadMX(rol_funcionalidad: RolFuncionalidad) {
    return this._http.put(this.globalsComponent.host_corporativo + '/rol_funcionalidad/', rol_funcionalidad);
  }

  public deleteRol_Funcionalidad(id_rol: number) {
    return this._http.put(this.globalsComponent.host_corporativo + '/rol_funcionalidad/delete/rol/' + id_rol, { id: id_rol });
  }

}
