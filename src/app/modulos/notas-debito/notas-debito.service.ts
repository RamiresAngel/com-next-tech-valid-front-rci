import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GlobalsComponent } from './../../compartidos/globals/globals.component';
import { Observable } from '../../../../node_modules/rxjs';
import { Usuario } from '../../entidades/usuario';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { StorageService } from '../../compartidos/login/storage.service';

@Injectable({
  providedIn: 'root'
})
export class NotasDebitoService {

  private endpoint: string;
  usuario = new Usuario();
  constructor(private http: Http, private globalComponent: GlobalsComponent, private sessionStr: StorageService) {
    this.usuario = this.sessionStr.loadSessionData();
  }

  public obtenerNotasDebito(): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.usuario.token });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.globalComponent.host + ':9011/api/v1/facto_valid/documento/list',
      {
        'draw': 1,
        'length': 10,
        'start': 0,
        'search': {
          'value': ''
        },
        'filt': {

          'fecha_emision': '',
          'fecha_creacion': '',
          'cedula_emisor': '',
          'razon_social': '',
          'clave': '',
          'tipo': 'nota_debito',
          'moneda': '',
          'estatus_acuse': '',
          'estatus_dgt': '',
          'centro_consumo_id': [3],
          'listtype': 'list'
        },
        'order': [{
          'dir': 'asc'
        }],
        'columns': [{
          'dir': 'asc'
        }]


      }
      , options).pipe(map(this.extractData));
  }
  public obtenerDocumentosRelacionados(id: any): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.usuario.token });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.globalComponent.host + '/api/v1/valid/carga_factura/documento/relacionado',
      {
        'id': id,
        'tipo': 'nota_debito'
      }
      , options).pipe(map(this.extractData));
  }
  private extractData(res: Response) {
    const body = res.json();
    return body;
  }
}
