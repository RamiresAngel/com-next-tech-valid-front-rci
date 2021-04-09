import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GlobalsComponent} from './../../compartidos/globals/globals.component';
import { Observable } from '../../../../node_modules/rxjs';

import { Usuario } from '../../entidades/usuario';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { StorageService } from '../../compartidos/login/storage.service';
@Injectable({
  providedIn: 'root'
})
export class EnviarDgtService {
  usuario = new Usuario();
  constructor(private _http: HttpClient, private globalComponent: GlobalsComponent, private sessionStr: StorageService) {
    this.usuario = this.sessionStr.loadSessionData();
   }
   host: string;
   enviarAcuse(acuse: any): Observable<any> {
    const headersSend = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', this.usuario.token);
    // tslint:disable-next-line:max-line-length
    return this._http.post(this.globalComponent.host + '/api/v1/valid/comunicacion_pack/acuseDGT/Validar', acuse, {headers: headersSend});
  }
}
