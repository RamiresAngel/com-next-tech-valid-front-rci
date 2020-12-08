import { Injectable } from '@angular/core';
import { FiltroSaldos } from 'src/app/entidades/filtro';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';

@Injectable({
  providedIn: 'root'
})
export class ConsultaSaldosService {

  constructor(
    private _http: HttpClient2,
    private globals: GlobalsComponent
  ) { }

  consultarSaldo(filtro_saldo: FiltroSaldos) {
    return this._http.post(`${this.globals.host_documentos}/consulta_saldos_proveedor`, filtro_saldo);
  }
}
