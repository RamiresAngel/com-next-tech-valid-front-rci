import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FileUpload } from './clases/file-upload';
import { OtrosDocumentos } from './clases/file-upload';
import { Observable } from '../../../../node_modules/rxjs';
import { GlobalsComponent } from './../../compartidos/globals/globals.component';
@Injectable()
export class CancelarDocumentoService {
  private endpoint: string;
  constructor(private _http: HttpClient, private _globals: GlobalsComponent) {
  }

  cancelarDocumento(data: any): Observable<any> {
    const header = new HttpHeaders().set('contentType', 'application/json').set('Authorization', '5b2d486bbb7fdf24cc62c90f');
    this.endpoint = this._globals.host + ':/api/v1/valid/carga_documento/factura/xml/' + data;
    return this._http.delete(this.endpoint, { headers: header });
  }
}
