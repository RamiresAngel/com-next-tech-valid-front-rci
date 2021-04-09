import { Injectable } from '@angular/core';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { TipoCuenta } from 'src/app/entidades/tipo-cuenta';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';

@Injectable({
  providedIn: 'root'
})
export class TipoCuentaService {
  private endpoint: string;
  constructor(
    private _http: HttpClient2,
    private _globals: GlobalsComponent
  ) {
    this.endpoint = this._globals.host_corporativo + '/tipo_cuenta/';
  }


  public crearTipoCuenta(tipo_cuenta: TipoCuenta) {
    return this._http.post(this.endpoint, tipo_cuenta);
  }

  public obtenerTipoCuentaCorporativoIdentificador(id_corporativo: string) {
    return this._http.get(this.endpoint + `${id_corporativo}/corporativo`);
  }
  obtenerTipoCuentaCorporativoAdminNext() {
    return this._http.get(this.endpoint);
  }
  obtenerTipoCuentaIdentificador(identificador_tipo_cuenta) {
    return this._http.get(this.endpoint + identificador_tipo_cuenta);
  }

  actualizarTipoCuenta(tipo_cuenta: TipoCuenta) {
    return this._http.put(this.endpoint, tipo_cuenta);
  }
}
