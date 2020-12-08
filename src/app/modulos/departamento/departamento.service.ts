import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Departamento } from 'src/app/entidades/Departamento';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  endpoint: string;
  constructor(
    private _http: HttpClient2,
    private globalsComponent: GlobalsComponent
  ) {
    this.endpoint = `${this.globalsComponent.host_corporativo}/departamento/`;
  }

  crearDepartamento(departamento: Departamento) {
    return this._http.post(this.endpoint, departamento);
  }

  obtenerDepartamentoPorCorporativo(identificador_corporativo: string, id_user: string, id_rol: number) {
    return this._http.get(`${this.globalsComponent.host_corporativo}/departamento/${identificador_corporativo}/corporativo`);
    // return this._http.get(`${this.globalsComponent.host_corporativo}/departamento/${identificador_corporativo}/corporativo/${id_user}/usuario/${id_rol}/rol`);
    // api/v1/validm/corporativo/departamento/{identificador}/corporativo/min/{identificador_usuario}/usuario/{rol_id}/rol
  }
  obtenerDepartamentoPorCorporativoMin(identificador_corporativo: string) {
    return this._http.get(this.endpoint + identificador_corporativo + '/corporativo/min');
  }

  obtenerDepartamentoPorIdentificador(identificador_departamento: string) {
    return this._http.get(this.endpoint + identificador_departamento);
  }

  obtenerTodosDepartamentos() {
    return this._http.get(this.endpoint);
  }

  actualizarDepartamento(departamento: Departamento) {
    return this._http.put(this.endpoint, departamento);
  }
}
