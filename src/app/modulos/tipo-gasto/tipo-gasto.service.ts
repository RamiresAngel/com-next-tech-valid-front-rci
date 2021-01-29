import { Injectable } from '@angular/core';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { Contribuyente } from 'src/app/entidades/contribuyente';
import { RelacionTipoGasto } from 'src/app/entidades/Relacion-Tipo-Gasto';

@Injectable({
  providedIn: 'root'
})
export class TipoGastoService {

  constructor(
    private _http: HttpClient2,
    private globals: GlobalsComponent
  ) { }

  public obtenerTipoGastoIdCorporativoIdentificador(identificador_corporativo: string, id_tipo_gasto: string) {
    return this._http.get(`${this.globals.host_administracion}/tipo_gasto/relacion_cuenta/${identificador_corporativo}/corporativo/${id_tipo_gasto}/tipo_gasto`);
  }

  public obtenerParametrosTipoGasto(identificador_corporativo) {
    return this._http.get(`${this.globals.host_administracion}/tipo_gasto/${identificador_corporativo}/identificador_corporativo
    `);
  }

  public actualizarRelacionTipoGastoCuenta(identificador_corporativo: string, data: any) {
    return this._http.put(`${this.globals.host_administracion}/tipo_gasto/relacion_cuenta/${identificador_corporativo}/corporativo`, data);
  }

  public obtenerMontoTipoGsatiCorporativo(identificador_corporativo: string, tipo_gasto_id: string) {
    return this._http.get(`${this.globals.host_administracion}/tipo_gasto/monto/${identificador_corporativo}/corporativo/${tipo_gasto_id}/tipo_gasto`);
  }

  public agregarMontoATipoGastoPorCorporativo(identificador_corporativo: string, relacion_monoto_tipo_gasto: any) {
    return this._http.post(`${this.globals.host_administracion}/tipo_gasto/monto/${identificador_corporativo}/corporativo`, relacion_monoto_tipo_gasto);
  }

  public agregarRelacionTipoGastoCorporativo(identificador_corporativo: string, identificador_tipo_gasto: string, relacion_cuenta_contribuyente: any) {
    // tslint:disable-next-line:max-line-length
    return this._http.post(`${this.globals.host_administracion}/tipo_gasto/relacion_cuenta/${identificador_corporativo}/corporativo`, relacion_cuenta_contribuyente);
  }

  public eliminarRelacion(relacion: RelacionTipoGasto) {
    return this._http.put(`${this.globals.host_administracion}/tipo_gasto/relacion_cuenta/${relacion.id}/delete`, relacion);
  }
  /* Tipo Gasto Header - RCI */

  public getlistCuentaAgrupacion(id_tipo_gasto: string, id_corporativo: string) {
    return this._http.get(`${this.globals.host_administracion}/tipo_gasto/${id_tipo_gasto}/corporativo/${id_corporativo}/cuenta_agrupacion_header`);
  }

  public getlistFrecuenciaFiscal(id_corporativo: string) {
    return this._http.get(`${this.globals.host_administracion}/tipo_gasto/corporativo/${id_corporativo}/frecuencia_fiscal`);
  }

  public getObtenerCuentaAgrupacion(id: number) {
    return this._http.get(`${this.globals.host_administracion}/tipo_gasto/cuenta_agrupacion_header/${id}`);
  }

  public creaCuentaAgrupacion(cuenta_gasto) {
    return this._http.post(this.globals.host_administracion + '/tipo_gasto/cuenta_agrupacion_header', cuenta_gasto);
  }

  public editaCuentaAgrupacion(cuenta_gasto) {
    return this._http.put(this.globals.host_administracion + '/tipo_gasto/cuenta_agrupacion_header/' + cuenta_gasto.id, cuenta_gasto);
  }

}
