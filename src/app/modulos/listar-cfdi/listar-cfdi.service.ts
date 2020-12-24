import { Injectable } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';

@Injectable({
  providedIn: 'root'
})
export class ListarCfdiService {

  constructor(
    private globals: GlobalsComponent
    , private _http: HttpClient2
  ) {
  }

  obtnerDocumentos(filtro) {
    this._http.post(`${this.globals.host_documentos}/list`, filtro);
  }
  obtenerComplementos(id_cfdi: string) {
    return this._http.get(`${this.globals.host_documentos}/complemento/${id_cfdi}`);
  }
  obtenerRelacionados(id_cfdi: string) {
    return this._http.get(`${this.globals.host_documentos}/relacionados/${id_cfdi}`);
  }
  eliminarDocumento(id_cfdi: string, identificador_usuario: string, id?: number) {
    let data = {
      id: Number(id),
      folio_fiscal: id_cfdi,
      identificador_usuario: identificador_usuario
    }
    //let host = 'http://10.10.5.162:6001/api/v1/validm/documento/eliminar'
    let host = `${this.globals.host_documentos}/eliminar`
    return this._http.post(host, data);
  }

  validarEstatusSAT(lista_documentos: any[]) {
    return this._http.put(`${this.globals.host_documentos}/validar`, lista_documentos);
  }
}
