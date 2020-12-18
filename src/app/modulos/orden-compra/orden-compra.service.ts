import { HttpClient2 } from './../../compartidos/servicios_compartidos/http-clien.service';
import { GlobalsComponent } from './../../compartidos/globals/globals.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdenCompraService {
  endpoint: string;

  constructor(
    private globalsComponent: GlobalsComponent,
    private _http: HttpClient2
  ) {
    this.endpoint = this.globalsComponent.host_corporativo;
  }

  public listTipoDocumento() {
    return this._http.get('');
  }
}
