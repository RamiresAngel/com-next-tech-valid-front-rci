import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { GlobalsComponent } from './../../compartidos/globals/globals.component';
import { StorageService } from '../../compartidos/login/storage.service';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { PeriodoValidacion } from 'src/app/entidades/periodo-validacion';

@Injectable({
  providedIn: 'root'
})
export class PeriodoValidacionService {
  header: HttpHeaders;
  constructor(
    private globalsComponent: GlobalsComponent
    , private sessionStr: StorageService
    , private _http: HttpClient2
  ) { }
  /**
    * Método para obtener las periodo de México,
    * borrar.
  */
  public ObtenerListaPeriodosMX() {
    // return this._http.get(this.globalsComponent.host2 + '/api/v1/validm/administrativo/parametros_sistema');
  }

  public ObtenerListaPeriodosMXPorCorporativo(identificador_corporativo: string) {
    return this._http.get(this.globalsComponent.host_administracion + '/periodo_validacion/' + identificador_corporativo + '/corporativo');
  }

  public GuardarPeriodoMX(periodo: Array<PeriodoValidacion>) {
    return this._http.post(this.globalsComponent.host_administracion + '/periodo_validacion', periodo);
  }

  public ActualizarPeriodoMX(periodo: PeriodoValidacion) {
    return this._http.post(this.globalsComponent.host_administracion + '/periodo_validacion', periodo);
  }


}
