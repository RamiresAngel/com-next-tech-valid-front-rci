import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { GlobalsComponent } from './../../compartidos/globals/globals.component';
import { Usuario } from './../../entidades/usuario';
import { StorageService } from './../../compartidos/login/storage.service';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { Funcionalidad } from 'src/app/entidades/funcionalidad';
@Injectable()
export class FuncionalidadService {
  id: number;
  private endpoint: string;
  header: HttpHeaders;
  usuario = new Usuario();

  constructor(
    private globals: GlobalsComponent,
    private sessionStr: StorageService,
    private _http: HttpClient2
  ) {
    this.endpoint = `${this.globals.host_corporativo}`;
  }

  public obtenerFuncionalidadCF() {
    return this._http.get(this.endpoint + '/funcionalidad/clave_facto/' + this.globals.CLAVE_FACTO);
  }
  public ObtenerListaFuncionalidadesClaveFacto() {
    return this._http.get(`${this.endpoint}/funcionalidad/clave_facto/${this.globals.CLAVE_FACTO}`);
  }

  public crearFuncionalidad(funcionalidad: Funcionalidad) {
    funcionalidad.clave_facto = this.globals.CLAVE_FACTO;
    return this._http.post(this.endpoint + '/funcionalidad/', funcionalidad);
  }

  public obtenerFuncionalidadId(id: String) {
    return this._http.get(this.endpoint + '/funcionalidad/' + id + '/id');
  }

  public actualizarFuncionalidad(funcionalidad: Funcionalidad) {
    return this._http.put(this.endpoint + '/funcionalidad/', funcionalidad);
  }

  public obtenerFuncionalidadMin() {
    return this._http.get(this.endpoint + '/funcionalidad/min/' + this.globals.CLAVE_FACTO);
  }
}
