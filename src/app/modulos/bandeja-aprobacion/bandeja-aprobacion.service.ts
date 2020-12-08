import { Injectable } from '@angular/core';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';

@Injectable({
  providedIn: 'root'
})
export class BandejaAprobacionService {
  private endpoint: string;
  constructor(
    private _http: HttpClient2,
    private _globals: GlobalsComponent
  ) {
  }

  public aprobarSolicitudGeneral(identificador_aprobador: string, id_registro: number) {
    const obj = {
      id_solicitud: id_registro,
      identificador_aprobador: identificador_aprobador
    };
    // Creo que yha no se usa/validm/documento/solicitud/anticipo_general/aprobar
    return this._http.post(`${this._globals.host}/api/v1`, obj);
  }

  public aprobarAmortizacion(identificador_aprobador: string, id_registro: number) {
    return this._http.post(this.endpoint, identificador_aprobador);
  }

  public aprobarAcreedor(identificador_aprobador: string, id_registro: number) {
    return this._http.post(this.endpoint, identificador_aprobador);
  }

}
