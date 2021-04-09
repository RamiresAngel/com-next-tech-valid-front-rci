import { Injectable } from '@angular/core';
import { MetodoPago } from 'src/app/entidades/Metodo-Pago';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {
  endpoint: string;
  constructor(
    private _http: HttpClient2,
    private globals: GlobalsComponent
  ) {
    // this.header = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': '24185608-780e-4ddb-aaaa-3c5ee9616952' });
  }

  public obtnerMetodosPago(identificador_corporativo) {
    return this._http.get(this.globals.host_administracion + '/metodo_pago/' + identificador_corporativo + '/corporativo');
  }

  public obtenerMetodoPagoId(id: string) {
    return this._http.get(this.globals.host_administracion + '/metodo_pago/' + id + '/id');
  }

  public crearMetodoPago(metodo_pago: MetodoPago) {
    return this._http.post(this.globals.host_administracion + '/metodo_pago/', metodo_pago);
  }
  public actualizarMetodoPago(metodo_pago: MetodoPago) {
    return this._http.put(this.globals.host_administracion + '/metodo_pago/', metodo_pago);
  }
  public eliminarMetodoPago(id: string) {
    return this._http.put(this.globals.host_administracion + '/metodo_pago/' + id + '/delete', {});
  }

}
