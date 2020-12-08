import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FileUpload } from './clases/file-upload';
import { OtrosDocumentos } from './clases/file-upload';
import { GlobalsComponent } from './../../compartidos/globals/globals.component';
@Injectable()
export class DocumentoAddService {

  private endpoint: string;
  constructor(private _http: HttpClient, private globalsComponent: GlobalsComponent) {
  }

  // ############ FACTURAS ################
  loadXml(file: FileUpload) {
    const header = new HttpHeaders().set('contentType', 'application/json').set('Authorization', '5b2d486bbb7fdf24cc62c90f');
    this.endpoint = 'http://127.0.0.1:5005/api/v1/valid/carga_factura/documento/factura/xml';
    // this.endpoint = this.globalsComponent.host + '/api/v1/valid/carga_factura/documento/factura/xml';
    return this._http.post(this.endpoint, file, { headers: header, observe: 'response' });
  }

  loadArchivos(file: OtrosDocumentos, tipo: string, tipoDocumento: string) {
    const header = new HttpHeaders().set('contentType', 'application/json').set('Authorization', '5b2d486bbb7fdf24cc62c90f');
    if (tipoDocumento === 'Factura') {
      this.endpoint = this.globalsComponent.host + '/api/v1/valid/manage_file/file/' + tipo + '/factura';
    }
    if (tipoDocumento === 'Nota_Credito') {
      this.endpoint = this.globalsComponent.host + '/api/v1/valid/manage_file/file/' + tipo + '/nota_credito';
    }
    if (tipoDocumento === 'Nota_Debito') {
      this.endpoint = this.globalsComponent.host + '/api/v1/valid/manage_file/file/' + tipo + '/nota_debito';
    }
    return this._http.post(this.endpoint, file, { headers: header, observe: 'response' });
  }
  // ############ FACTURAS ################


  // ############ NOTA DEBITO ################
  loadXmlDebito(file: FileUpload) {
    const header = new HttpHeaders().set('contentType', 'application/json').set('Authorization', '5b2d486bbb7fdf24cc62c90f');
    this.endpoint = this.globalsComponent.host + '/api/v1/valid/carga_factura/documento/nota_debito/xml';
    return this._http.post(this.endpoint, file, { headers: header, observe: 'response' });
  }
  // ############ NOTA DEBITO ################

  // ############ NOTA CRÉDITO ################
  loadXmlCredito(file: FileUpload) {
    const header = new HttpHeaders().set('contentType', 'application/json').set('Authorization', '5b2d486bbb7fdf24cc62c90f');
    this.endpoint = this.globalsComponent.host + '/api/v1/valid/carga_factura/documento/nota_credito/xml';
    return this._http.post(this.endpoint, file, { headers: header, observe: 'response' });
  }
  // ############ NOTA CRÉDITO ################


  // ############# CANCELAR BORRADOR FACTURA ##############
  cancelFacturaXml(header: string) {
    const f = new HttpHeaders().set('contentType', 'application/json').set('Authorization', '5b2d486bbb7fdf24cc62c90f');
    this.endpoint = this.globalsComponent.host + '/api/v1/valid/carga_factura/documento/nota_credito/xml';
    return this._http.post(this.endpoint, header, { headers: f, observe: 'response' });
  }
  // ############# CANCELAR BORRADOR FACTURA ##############



  finalizarTransaccion(loteCarga: any) {
    const f = new HttpHeaders().set('contentType', 'application/json').set('Authorization', '5b2d486bbb7fdf24cc62c90f');
    this.endpoint = this.globalsComponent.host + '/api/v1/valid/carga_factura/documento/finalizar_transaccion/' + loteCarga;
    return this._http.put(this.endpoint, '', { headers: f, observe: 'response' });
  }

}
/*
For the revelation awaits an appointed time;
    it speaks of the end
    and will not prove false.
Though it linger, wait for it;
    it[a] will certainly come
    and will not delay.
    habakkuk 2:3
*/
