import { AprobacionParcial } from './../../entidades/AprobacionParcial';
import { Injectable } from '@angular/core';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { FiltroComprobacionBandejaAprobacion } from 'src/app/entidades/ComprobacionBandejaAprobacion';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BandejaAprobacionService {
  private endpoint: string;
  public datos_aprobacion = { nivel_aproacion: 0, is_aprobacion: false };
  private datos_aprobacion$ = new Subject<{ nivel_aproacion: number, is_aprobacion: boolean }>();
  constructor(
    private _http: HttpClient2,
    private _globals: GlobalsComponent
  ) {
  }

  public setAprobacionData(data = { nivel_aproacion: 0, is_aprobacion: false }) {
    this.datos_aprobacion = data;
    localStorage.setItem('aprobacion_data', JSON.stringify(this.datos_aprobacion));
    this.datos_aprobacion$.next(this.datos_aprobacion);
  }

  public getAprobacionData() {
    return this.datos_aprobacion$.asObservable();
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

  public listarComprobacionesGV(filtro: FiltroComprobacionBandejaAprobacion) {
    return this._http.post(`${this._globals.host_gastos_viaje}/comprobacion/aprobacion/list`, filtro);
  }

  public aprobarParcialmente(aprobacion: AprobacionParcial) {
    return this._http.post(`${this._globals.host_gastos_viaje}/comprobacion/aprobar`, aprobacion);
  }
  public rechazarComprobacion(aprobacion: AprobacionParcial) {
    return this._http.post(`${this._globals.host_gastos_viaje}/comprobacion/rechazar`, aprobacion);
  }
  public solicitarCambiosComprobacion(aprobacion: AprobacionParcial) {
    return this._http.post(`${this._globals.host_gastos_viaje}/comprobacion/solicitud_cambios`, aprobacion);
  }

}
