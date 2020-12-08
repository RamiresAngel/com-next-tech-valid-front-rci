import { Injectable } from '@angular/core';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { Amortizacion, AccionAprobar } from 'src/app/entidades';
import { Body } from '@angular/http/src/body';

@Injectable({
  providedIn: 'root'
})
export class AmortizacionService {

  host: string;
  constructor(
    private _http: HttpClient2,
    private globals: GlobalsComponent
  ) {
  }

  obtenerDetallesAmortizacion(id_amortizacion: any) {
    return this._http.post(`${this.globals.host_documentos}/gasto/amortizaciones/${id_amortizacion}`, {});
  }
  crearAmortizacion(amortizacion: Amortizacion) {
    return this._http.post(`${this.globals.host_documentos}/gasto/amortizacion`, amortizacion);
  }

  obtenerMontosPeriodo(fecha_inicio, fecha_fin, monto_amortizar) {
    return this._http.post(`${this.globals.host_documentos}/gasto/amortizaciones/list_periodos`, {
      fecha_inicio,
      fecha_fin,
      monto_amortizar
    });
  }

  aprobarAmortizacion(aprobacion: AccionAprobar) {
    return this._http.post(`${this.globals.host_documentos}/gasto/amortizaciones/aprobar`, aprobacion);
  }
  rechazarAmortizacion(rechazar: AccionAprobar) {
    return this._http.post(`${this.globals.host_documentos}/gasto/amortizaciones/rechazar`, rechazar);
  }
}
