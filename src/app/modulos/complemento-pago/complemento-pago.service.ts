import { Injectable } from '@angular/core';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';

@Injectable({
  providedIn: 'root'
})
export class ComplementoPagoService {

  constructor(
    private _http: HttpClient2,
    private globals: GlobalsComponent
  ) { }
  public cargarDocumento(documento: any) {
    return this._http.post(`${this.globals.host_documentos}/carga/complemento_pago`, documento);
  }
}
