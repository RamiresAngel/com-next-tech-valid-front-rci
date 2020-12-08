import { Injectable } from '@angular/core';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { AccionAprobar, TipoRetencion } from 'src/app/entidades';
@Injectable({
  providedIn: 'root'
})
export class ProveedoresInformalesService {

  constructor(
    private _http: HttpClient2,
    private globals: GlobalsComponent
  ) {
  }

  obtenerDetallesProveedorInformal(id_proveedor_informal: any) {
    return this._http.post(`${this.globals.host_documentos}/gasto/proveedor_informal/${id_proveedor_informal}`, {});
  }
  crearProveedorInformal(proveedor_informal: any/*Placeholder Class*/) {
    return this._http.post(`${this.globals.host_documentos}/gasto/proveedor_informal`, proveedor_informal);
  }

  obtenerMontosPeriodo(fecha_inicio, fecha_fin, monto_proveedor_informal) {
    return this._http.post(`${this.globals.host_documentos}/gasto/proveedor_informal/list_periodos`, {
      fecha_inicio,
      fecha_fin,
      monto_proveedor_informal
    });
  }

  listpreliminaresProveedorInformal(filtro) {
    return this._http.post(`${this.globals.host_documentos}/gastos/list_proveedor_informal`, filtro);
  }

  aprobarProveedorInformal(aprobacion: AccionAprobar) {
    return this._http.post(`${this.globals.host_documentos}/gasto/proveedor_informal/aprobar`, aprobacion);
  }
  rechazarProveedorInformal(rechazar: AccionAprobar) {
    return this._http.post(`${this.globals.host_documentos}/gasto/proveedor_informal/rechazar`, rechazar);
  }

  cuentasProrrareoByProveedorInformal() {
    return this._http.get(`${this.globals.host_corporativo}/usuario/cuentas_prorrateo_by_informal/10/tipo_gasto`);
  }
  guardarRetencion(identificador_header: string, retencion: TipoRetencion) {
    return this._http.post(`${this.globals.host_republica_dominicana}/bufer_facturas_header/retencion/${identificador_header}`, [retencion]);
  }
}
