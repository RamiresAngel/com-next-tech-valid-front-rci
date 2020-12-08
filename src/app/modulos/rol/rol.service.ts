import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { GlobalsComponent } from './../../compartidos/globals/globals.component';
import { StorageService } from './../../compartidos/login/storage.service';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { Rol } from 'src/app/entidades/rol';

@Injectable()
export class RolService {
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
  public ObtenerListaRolesMX() {
    return this._http.get(
      this.globalsComponent.host_corporativo + '/rol/adm/next'
    );
  }

  public ObtenerListaRolesMXPorCorporativo(identificador_corporativo: string) {
    return this._http.get(this.globalsComponent.host_corporativo + '/rol/' + identificador_corporativo + '/corporativo');
  }
  /**
   * Retorna un array de corporativos en base a los identificadores enviados
   * - Gadiel Guerrero
   * - 26/03/2019
   * @param data body con los identificadores necesarios para la peticion
   */
  public ObtenerListaRolesMXPorIdentificador(data: any) {
    return this._http.post(`${this.globalsComponent.host_corporativo}/rol/agrupador`, data);
  }

  public ObtenerListaRolesMXMinPorAgrupador(data: any) {
    return this._http.post(`${this.globalsComponent.host_corporativo}/rol/min/agrupador`, data);
  }

  public ObtenerRolMXByid(id_rol: number) {
    return this._http.get(
      this.globalsComponent.host_corporativo + '/rol/id/' + id_rol
    );
  }

  public GuardarRolMX(rol: Rol) {
    return this._http.post(
      this.globalsComponent.host_corporativo + '/rol/',
      rol
    );
  }

  public ActualizarRolMX(rol: Rol) {
    return this._http.put(
      this.globalsComponent.host_corporativo + '/rol/',
      rol
    );
  }
  public obtenerRolesClaveFacto(claveFacto: string) {
    const admin = '1';
    return this._http.get(
      this.globalsComponent.host_corporativo + '/' +
      claveFacto
    );
  }
}
