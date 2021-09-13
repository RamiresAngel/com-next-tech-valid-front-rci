import { Injectable } from '@angular/core';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { TipoRetencion } from 'src/app/entidades';

@Injectable({
  providedIn: 'root'
})
export class CatalogoTipoRetencionService {

  constructor(
    public _http: HttpClient2,
    public globals: GlobalsComponent
  ) { }

  public obtenerTiposRetencion(indentificador_corporativo: string) {
    return this._http.get(`${this.globals.host_republica_dominicana}/tipo_retencion/${indentificador_corporativo}`);
  }
  public obtenerTipoRetencion(id: number) {
    return this._http.get(`${this.globals.host_republica_dominicana}/tipo_retencion/${id}`);
  }
  public actualizarTipoRetencion(id, tipo_retencion: TipoRetencion) {
    return this._http.put(`${this.globals.host_republica_dominicana}/tipo_retencion/${id}`, tipo_retencion);
  }
  public crearTipoRetencion(tipo_retencion: TipoRetencion) {
    return this._http.post(`${this.globals.host_republica_dominicana}/tipo_retencion/`, tipo_retencion);
  }
}
