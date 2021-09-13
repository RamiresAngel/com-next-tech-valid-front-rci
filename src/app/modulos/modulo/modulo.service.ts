import { Injectable } from '@angular/core';
import { GlobalsComponent } from './../../compartidos/globals/globals.component';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { Modulo } from 'src/app/entidades/modulo';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {
  id: number;
  private endpoint: string;

  constructor(
    private _http: HttpClient2,
    private globals: GlobalsComponent
  ) {
    this.endpoint = this.globals.host_corporativo;
  }

  /**
   * crearModulo
   */
  public crearModulo(modulo: Modulo) {
    modulo.clave_facto = this.globals.CLAVE_FACTO;
    return this._http.post(this.endpoint + '/modulo', modulo);
  }

  public obtenerModuloCF() {
    return this._http.get(this.endpoint + '/modulo/clave_facto/' + this.globals.CLAVE_FACTO);
  }

  public actualizarModulo(modulo: Modulo) {
    return this._http.put(this.endpoint + '/modulo', modulo);
  }

  public obtnerModulosMin() {
    return this._http.get(this.endpoint + '/modulo/min/' + this.globals.CLAVE_FACTO);
  }

  public obtenerModuloId(id: string) {
    return this._http.get(this.endpoint + '/modulo/' + id + '/id');
  }
}
