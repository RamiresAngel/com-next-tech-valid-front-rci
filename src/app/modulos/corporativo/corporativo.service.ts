import { Injectable } from '@angular/core';
import { GlobalsComponent } from './../../compartidos/globals/globals.component';
import { Usuario } from './../../entidades/usuario';
import { StorageService } from './../../compartidos/login/storage.service';
import { Corporativo } from 'src/app/entidades/corporativo';
import { Observable } from 'rxjs';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';

@Injectable()
export class CorporativoService {

  usuario = new Usuario();
  private endpoint: string;
  private endpointexter: string;
  id: number;
  constructor(
    private _http: HttpClient2,
    private globalComponent: GlobalsComponent,
    private sessionStr: StorageService
  ) {
    this.usuario = this.sessionStr.loadSessionData();
    this.endpoint = this.globalComponent.host_corporativo + '/corporativo/';
  }

  public obtenerCorporativos() {
    return this._http.get(this.endpoint);
  }

  public agregarCorporativo(corporativo: Corporativo) {
    return this._http.post(this.endpoint, corporativo);
  }

  public actualizarCorporativo(corporativo: Corporativo) {
    return this._http.put(this.endpoint, corporativo);
  }

  /**
   * Devuelve un HTTPResponse del tipo corporativo
   * @param id id del corporativo del que se quieren obtener sus datos
   */
  public obtnerCorporativo(id: number): Observable<Object> {
    return this._http.get(`${this.endpoint}${id}/id`);
  }

  public validarCorporativo(claveFacto: string): Observable<Object> {
    return this._http.get(this.endpoint + 'cf/' + claveFacto);
  }
  public funcionalidadesCorporativo(corporativo_identificador: string): Observable<Object> {
    return this._http.get(`${this.globalComponent.host_corporativo}/funcionalidad_corporativo/corporativo/${corporativo_identificador}`);
  }

  /**
 * Elimina las funcionalidades relacionadas al corporativo
 * @param identificador_corporativo identificador del corporativo del que se quiere borrar las funcionalidades.
 */
  public borrarFuncionalidadesCorporativo(identificador_corporativo: string): Observable<Object> {
    return this._http.put(`${this.globalComponent.host_corporativo}/funcionalidad_corporativo/delete`, { identificador_corporativo });
  }

  /**
 * Agrega relacion de la funcionalidad y el corporativo proporcionados.
 * @param funcionalidad_id id de la funcionalidad
 * @param identificador_corporativo identificador del corporativo
 */
  public agregarFuncionalidadesCorporativo(funcionalidad_id: number, identificador_corporativo: string): Observable<Object> {
    return this._http.post(`${this.globalComponent.host_corporativo}/funcionalidad_corporativo`, { identificador_corporativo, funcionalidad_id });
  }

  /**
 * Lista las funcionalidades disponibles para el corporativo con el identifiador proporcionado.
 * @param identificador_corporativo identificador del corporativo
 */
  public obtenerFuncionalidadesCorporativo(identificador_corporativo: string): Observable<Object> {
    return this._http.get(`${this.globalComponent.host_corporativo}/funcionalidad_corporativo/corporativo/${identificador_corporativo}`);
  }
}
