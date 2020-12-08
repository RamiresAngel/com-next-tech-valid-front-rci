import { Injectable } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { DescuentoProntoPago } from 'src/app/entidades';

@Injectable({
  providedIn: 'root'
})
export class DescuentoProntoPagoService {

  constructor(
    private _http: HttpClient2,
    private globals: GlobalsComponent
  ) { }

  obtenerDecPP(identificador_corporativo: string) {
    return this._http.get(`${this.globals.host_administracion}/descuento_pronto_pago/${identificador_corporativo}/corporativo`);
  }
  obtenerDecPPId(id_Desc_PP: string) {
    return this._http.get(`${this.globals.host_administracion}/descuento_pronto_pago/${id_Desc_PP}/id`);
  }
  CrearDescuentoPP(identificador_corporativo: string, desceunto_pp: DescuentoProntoPago) {
    return this._http.post(`${this.globals.host_administracion}/descuento_pronto_pago/${identificador_corporativo}/corporativo`, desceunto_pp);
  }
  actualizarDescuentoPP(desceunto_pp: DescuentoProntoPago) {
    return this._http.put(`${this.globals.host_administracion}/descuento_pronto_pago`, desceunto_pp);
  }
  consultaCfdiDpp(filtroDpp: any) {
    console.log(filtroDpp);
    return this._http.post(`${this.globals.host_documentos}/dpp/consulta_facturas_disponibles`, filtroDpp);
  }
  obtenerLotesFacturas(filtroDpp: any) {
    return this._http.post(`${this.globals.host_documentos}/dpp/consulta_facturas_convocatoria`, filtroDpp);
  }
  cargaNotaCredito(nota_credito: any) {
    return this._http.post(`${this.globals.host_documentos}/dpp/carga/nota_credito`, nota_credito);
  }
  detalleFacturasDPP(id_convocatoriaDPP: any) {
    return this._http.get(`${this.globals.host_documentos}/dpp/consulta_facturas_convocatoria/${id_convocatoriaDPP}`);
  }
}
