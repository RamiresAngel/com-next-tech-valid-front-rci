import { Injectable } from '@angular/core';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';

@Injectable({
  providedIn: 'root'
})
export class SustitucionCfdiService {

  constructor(
    private globalsComponent: GlobalsComponent
    , private _http: HttpClient2
  ) { }

  public cargarDocumento(documento: any) {
    return this._http.post(`${this.globalsComponent.host_documentos}/carga/sustitucion_cfdi`, documento);
  }
}
