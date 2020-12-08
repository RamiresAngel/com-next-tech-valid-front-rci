import { Injectable } from '@angular/core';
import { NivelGasto } from 'src/app/entidades/Nivel-Gasto';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';

@Injectable({
  providedIn: 'root'
})
export class NivelGastoService {

  endpoint: string;

  constructor(
    private _http: HttpClient2,
    private globalsComponent: GlobalsComponent
  ) {
    this.endpoint = this.globalsComponent.host_corporativo + '/nivel_gasto/';
  }

  obtenerNivelGastoPorCorporativo(identificador_corporativo) {
    return this._http.get(this.endpoint + identificador_corporativo + '/corporativo');
  }

  obtenerNivelGastoPorIdentificador(identificador: string) {
    return this._http.get(this.endpoint + identificador);
  }

  obtenerTodosNivelGasto() {
    return this._http.get(this.endpoint);
  }

  agregarNivelGasto(nivel_gasto: NivelGasto) {
    return this._http.post(this.endpoint, nivel_gasto);
  }

  actualizarNivelGasto(nivel_gasto: NivelGasto) {
    return this._http.put(this.endpoint, nivel_gasto);
  }
}
