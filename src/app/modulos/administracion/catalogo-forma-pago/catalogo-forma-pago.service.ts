import { Injectable } from '@angular/core';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { FormaPago } from 'src/app/entidades/forma-pago';

@Injectable({
  providedIn: 'root'
})
export class CatalogoFormaPagoService {
  constructor(
    public _http: HttpClient2,
    public globals: GlobalsComponent
  ) { }

  public obtenerFormasPago(identificador_corporativo: string) {
    return this._http.get(`${this.globals.host_republica_dominicana}/forma_pago/${identificador_corporativo}`);
  }
  public obtenerFormaPago(id: number) {
    return this._http.get(`${this.globals.host_republica_dominicana}/forma_pago/${id}`);
  }
  public actualizarFormaPago(id, tipo_retencion: FormaPago) {
    return this._http.put(`${this.globals.host_republica_dominicana}/forma_pago/${id}`, tipo_retencion);
  }
  public crearFormaPago(tipo_retencion: FormaPago) {
    return this._http.post(`${this.globals.host_republica_dominicana}/forma_pago/`, tipo_retencion);
  }
}
