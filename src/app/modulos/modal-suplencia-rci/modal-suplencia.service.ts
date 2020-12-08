import { Injectable } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';

@Injectable({
  providedIn: 'root'
})
export class ModalSuplenciaService {
  endpoint: string;

  constructor(
    private globalsComponent: GlobalsComponent,
    private _http: HttpClient2
  ) {
    this.endpoint = this.globalsComponent.host_corporativo + '/suplencia/';
  }
  /* debe de ser el identificador de Usuario */
  public getListaHisSupl(identificador_usuario: string) {
    return this._http.get(this.endpoint + identificador_usuario + '/usuario');
  }

  public getSuplenciaId(id: string) {
    return this._http.get(this.endpoint + id);
  }

  public crearSuplencia(suplencia) {
    return this._http.post(this.endpoint, suplencia);
  }

  public editaSuplencia(suplencia) {
    console.log(suplencia);
    return this._http.put(`${this.endpoint}${suplencia.id}`, suplencia);
  }

  public eliminaSuplencia(suplencia) {
    return this._http.delete(`${this.endpoint}${suplencia.id}`);
  }

}
