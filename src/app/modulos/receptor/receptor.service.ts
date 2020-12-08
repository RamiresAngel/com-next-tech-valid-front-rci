import { Usuario } from './../../entidades/usuario';
import { StorageService } from './../../compartidos/login/storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Receptor, ReceptorToken } from './clases/receptor';
import { GlobalsComponent } from './../../compartidos/globals/globals.component';
declare var $: any;

@Injectable()
export class ReceptorService {
  header: HttpHeaders;
  usuario = new Usuario();
  private endpoint: string;
  private endpintExterno: string;
  private endpointExt: string;

  constructor(
    private _http: HttpClient,
    private globalsComponent: GlobalsComponent,
    private sessionStr: StorageService
  ) {
    this.usuario = this.sessionStr.loadSessionData();
    this.endpoint = this.globalsComponent.host_corporativo + '/receptor';
    this.endpintExterno = this.globalsComponent.host_corporativo + '/corporativo';
    this.endpointExt = this.globalsComponent.host_corporativo + '/tipo_identificacion';
    this.header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.usuario.token
    });
  }

  public getReceptores(corporativo_id) {
    const usuarioDato: any = this.sessionStr.loadSessionData();
    if (usuarioDato.admin_next === 1 && corporativo_id === '0') {
      return this._http.get(this.endpoint + '/admin/next', {
        headers: this.header,
        observe: 'response'
      });
    } else {
      if (usuarioDato.admin_next === 1) {
        return this._http.get(this.endpoint + '/' + corporativo_id, {
          headers: this.header,
          observe: 'response'
        });
      } else {
        return this._http.get(
          this.endpoint + '/' + usuarioDato.corporativo_id,
          { headers: this.header, observe: 'response' }
        );
        // return this._http.get(this.endpoint + '/' + usuarioDato.corporativo_id  , { headers: this.header, observe: 'response' });
      }
    }
  }

  // public getCorporativoMin() {
  //   // tslint:disable-next-line:max-line-length
  //   const usuarioId = this.sessionStr.loadSessionData();
  //   // tslint:disable-next-line:max-line-length
  //   return this._http.get(this.globalsComponent.host + usuarioId.usuarioId, { headers: this.header, observe: 'response' });
  // }

  public addReceptor(receptor: Receptor) {
    return this._http.post(this.endpoint, receptor, {
      headers: this.header,
      observe: 'response'
    });
  }

  public updateReceptor(receptor: Receptor) {
    return this._http.put(this.endpoint, receptor, {
      headers: this.header,
      observe: 'response'
    });
  }
  public getReceptoresId(id) {
    return this._http.get(this.endpoint + '/id/' + id, {
      headers: this.header,
      observe: 'response'
    });
  }
  public getCorporativosId(id) {
    return this._http.get(this.endpintExterno + '/id/' + id, {
      headers: this.header,
      observe: 'response'
    });
  }
  public updateAjustesReceptor(receptor: Receptor) {
    return this._http.put(this.endpoint + '/ajustes', receptor, {
      headers: this.header,
      observe: 'response'
    });
  }
  public updateAjustesDGTReceptor(receptor: ReceptorToken) {
    return this._http.put(this.endpoint + '/ajustes_dgt', receptor, {
      headers: this.header,
      observe: 'response'
    });
  }

  public getTipoIdentificacion() {
    return this._http.get(this.endpointExt, {
      headers: this.header,
      observe: 'response'
    });
  }
}
