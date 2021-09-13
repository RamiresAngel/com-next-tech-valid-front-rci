import { Injectable } from '@angular/core';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { AcreedorDiverso } from 'src/app/entidades/Acreedor-Diverso';

@Injectable({
  providedIn: 'root'
})
export class AcreedoresDiversosService {

  constructor(
    private _http: HttpClient2,
    private _globas: GlobalsComponent
  ) { }
  public obtenerAcreedoresDiversos(filtro: any) {
    return this._http.post(`${this._globas.host_documentos}/gasto/acreedores_diversos/list`, filtro);
  }
  public agregarAcreedorDiverso(acreedor_diverso: any) {
    return this._http.post(`${this._globas.host_documentos}/gasto/acreedor_diverso`, acreedor_diverso);
  }

  public acredores_by(identificador_contribuyente: string, tipoGasto: string) {
    return this._http.get(`${this._globas.host_corporativo}/usuario/acredores_by/${identificador_contribuyente}/contribuyente/${tipoGasto}/tipo_gasto`);
  }

  public verDetallesAcreedores(id_acreedor: string) {
    return this._http.get(`${this._globas.host_documentos}/gasto/preliminares/detalle/${id_acreedor}`);
  }

  public cargarNotaCreditoAcreedor(nota_credito: any) {
    return this._http.post(`${this._globas.host_documentos}/gasto/nota_credito`, nota_credito);
  }
  public aprobarAD(aprobacion: any) {
    return this._http.post(`${this._globas.host_documentos}/gasto/acreedor_diverso/aprobar`, aprobacion);
  }
  public rechazarAD(rechazo: any) {
    return this._http.post(`${this._globas.host_documentos}/gasto/acreedor_diverso/rechazar`, rechazo);
  }
  public obtenerDetallesAprobacion(id_documento: string, tipo_gasto) {
    return this._http.get(`${this._globas.host_documentos}/gasto/aprobacion/listar/${id_documento}/solicitud/${tipo_gasto}/tipo_gasto  `);
  }
  public obtenerDetallesAprobacionGV(id_documento: string, tipo_gasto, tipo_movimiento) {
    return this._http.get(`${this._globas.host_documentos}/gasto/aprobacion/listar/${id_documento}/solicitud/${tipo_gasto}/tipo_gasto/${tipo_movimiento}/tipo_movimiento`);
  }

}
