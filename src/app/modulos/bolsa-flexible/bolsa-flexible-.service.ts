import { Injectable } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';

@Injectable({
  providedIn: 'root'
})
export class BolsaFlexibleService {

  endpoint: string;

  constructor(
    private globalsComponent: GlobalsComponent,
    private _http: HttpClient2,
  ) {
    this.endpoint = this.globalsComponent.host_administracion + '/bolsa_fexible';
  }

  public getListBolsaFlexible(filtro: string) {
    // console.log(filtro);
    return this._http.get(this.endpoint + filtro);
  }

  public cargaExcelBolsaFlexible(carga_file) {
    return this._http.post(this.endpoint, carga_file);
  }

}
