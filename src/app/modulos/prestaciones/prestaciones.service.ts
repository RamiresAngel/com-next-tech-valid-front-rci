import { Injectable } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';

@Injectable({
  providedIn: 'root'
})
export class PrestacionesService {

  endpoint: string;

  constructor(
    private globalsComponent: GlobalsComponent,
    private _http: HttpClient2
  ) {
    this.endpoint = this.globalsComponent.host_administracion + '/prestacion/';
  }

  getListPrestaciones(identificador_prestaciones: string) {
    return this._http.get(this.endpoint + identificador_prestaciones + '/corporativo');
  }

  getPrestacionId(id: string) {
    return this._http.get(`${this.endpoint}${id}`);
  }

  creaPrestaciones(prestacion) {
    // console.log(prestacion);
    return this._http.post(this.endpoint, prestacion);
  }

  editaPrestacion(prestacion) {
    // console.log(prestacion);
    const aux_prestacion = {
      nombre: prestacion.nombre,
      tope_reembolsable: prestacion.tope_reembolsable,
      porcentaje_reembolsable: prestacion.porcentaje_reembolsable,
      identificador_usuario_creo: prestacion.identificador_usuario_creo,
      activo: prestacion.activo,
    };
    // console.log(aux_prestacion);
    return this._http.put(`${this.endpoint}${prestacion.id}`, aux_prestacion);
  }
}
