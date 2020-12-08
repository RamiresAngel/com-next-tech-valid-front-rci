import { Injectable } from '@angular/core';
import { TipoDocumentoSAP } from 'src/app/entidades/Tipo-Documento-SAP';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoSapService {
  endpoint: string;
  constructor(
    private _http: HttpClient2,
    private globals: GlobalsComponent
  ) {
  }


  public crearTipoDocumentoSAP(tipo_documento_sap: TipoDocumentoSAP) {
    return this._http.post(this.globals.host_administracion + '/tipo_documento_sap', tipo_documento_sap);
  }

  public obtenerTipoDocumentoSAPCorporativo(identificador_corporativo) {
    return this._http.get(`${this.globals.host_administracion}/tipo_documento_sap/${identificador_corporativo}/corporativo`);
  }
  public obtenerTipoDocumentoSAPId(id_tipo_documento: string) {
    return this._http.get(`${this.globals.host_administracion}/tipo_documento_sap/${id_tipo_documento}/id`);
  }

  public actualizarTipoDocumentoSAP(tipo_docuemnto_sap: TipoDocumentoSAP) {
    return this._http.put(this.globals.host_administracion + '/tipo_documento_sap', tipo_docuemnto_sap);
  }

}
