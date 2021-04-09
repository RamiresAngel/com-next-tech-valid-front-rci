import { CargoNoDedusible } from './../../entidades/cargo-no-dedusible';
import { Injectable } from '@angular/core';
import { Contribuyente } from 'src/app/entidades/contribuyente';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { Usuario } from 'src/app/entidades/usuario';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';

@Injectable({
  providedIn: 'root'
})
export class ComprobacionesGeneralService {

  public lista_contribuyentes = Array<Contribuyente>();
  private usuario = new Usuario();
  constructor(private _http: HttpClient2
    , private globalsComponent: GlobalsComponent
    , private sessionStr: StorageService) {
    this.usuario = this.sessionStr.loadSessionData();
  }

  public agregarCargoDeducible(cargo: CargoNoDedusible) {
    return this._http.post(`${this.globalsComponent.host_documentos}/gastos/carga`, cargo);
  }

  public agregarCargoNodeducible(cargo: CargoNoDedusible) {
    return this._http.post(`${this.globalsComponent.host_documentos}/gastos/carga/cuenta_no_deducible`, cargo);
  }

  public finalizarTransaccion(cargo: any) {
    return this._http.post(`${this.globalsComponent.host_documentos}/gastos/finalizar_comprobacion`, cargo);
  }

  public obtenerDetalles(id_comprobacion: any) {
    return this._http.get(`${this.globalsComponent.host_documentos}/gasto/preliminares/detalle/${id_comprobacion}`);
  }

  public obtenerTotales(id_solicitud: number, id_preliminar: number) {
    return this._http.get(`${this.globalsComponent.host_documentos}/gastos/totales_comprobados/${id_solicitud}/solicitud/${id_preliminar}/preliminar`);
  }

}

