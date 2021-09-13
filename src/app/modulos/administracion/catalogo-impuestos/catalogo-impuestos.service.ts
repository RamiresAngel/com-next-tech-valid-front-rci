import { Injectable } from '@angular/core';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { Impuesto } from 'src/app/entidades';

@Injectable({
  providedIn: 'root'
})
export class CatalogoImpuestosService {
  constructor(
    public _http: HttpClient2,
    public globals: GlobalsComponent
  ) { }

  public obtenerImpuestos(identificador_corporativo: string) {
    return this._http.get(`${this.globals.host_republica_dominicana}/cat_impuestos/${identificador_corporativo}`);
  }
  public obtenerImpuesto(id: number) {
    return this._http.get(`${this.globals.host_republica_dominicana}/cat_impuestos/${id}`);
  }
  public actualizarImpuesto(id, tipo_retencion: Impuesto) {
    return this._http.put(`${this.globals.host_republica_dominicana}/cat_impuestos/${id}`, tipo_retencion);
  }
  public crearImpuesto(tipo_retencion: Impuesto) {
    return this._http.post(`${this.globals.host_republica_dominicana}/cat_impuestos/`, tipo_retencion);
  }
}
