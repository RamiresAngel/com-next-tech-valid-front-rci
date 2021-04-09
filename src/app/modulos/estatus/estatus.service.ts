import { Estatus } from './clases/estatus';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GlobalsComponent } from './../../compartidos/globals/globals.component';
import { Usuario } from './../../entidades/usuario';
import { StorageService } from './../../compartidos/login/storage.service';

@Injectable({
  providedIn: 'root'
})
export class EstatusService {
  header: HttpHeaders;
  usuario = new Usuario();
  id: number;
  private endpoint: string;

  constructor(private _http: HttpClient, private globalsComponent: GlobalsComponent, private sessionStr: StorageService) {
    this.endpoint = this.globalsComponent.host_corporativo + '/configuracion';
    this.usuario = this.sessionStr.loadSessionData();
    this.header = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.usuario.token });
  }
  // SERVICIOS CATALOGO ESTATUS PORTAL
  public getEstatusPortal() {
    return this._http.get(this.endpoint + '/estatus_portal', { headers: this.header, observe: 'response' });
  }

  public addEstatusPortal(estatus: Estatus) {
    return this._http.post(this.endpoint + '/estatus_portal', estatus, { headers: this.header, observe: 'response' });
  }

  public updateEstatusPortal(estatus: Estatus) {
    return this._http.put(this.endpoint + '/estatus_portal', estatus, { headers: this.header, observe: 'response' });
  }
  public getEstatusPortalId(id) {
    return this._http.get(this.endpoint + '/estatus_portal/id/' + id, { headers: this.header, observe: 'response' });
  }

  // SERVICIOS   CATALOGO ESTATUS ACUSE
  public getEstatusAcuse() {
    return this._http.get(this.endpoint + '/estatus_acuse', { headers: this.header, observe: 'response' });
  }

  public addEstatusAcuse(estatus: Estatus) {
    return this._http.post(this.endpoint + '/estatus_acuse', estatus, { headers: this.header, observe: 'response' });
  }

  public updateEstatusAcuse(estatus: Estatus) {
    return this._http.put(this.endpoint + '/estatus_acuse', estatus, { headers: this.header, observe: 'response' });
  }
  public getEstatusAcuseId(id) {
    return this._http.get(this.endpoint + '/estatus_acuse/id/' + id, { headers: this.header, observe: 'response' });
  }

  // SERVICIOS  CATALOGO ESTATUS FISCAL DGT
  public getEstatusFiscal() {
    return this._http.get(this.endpoint + '/estatus_fiscal', { headers: this.header, observe: 'response' });
  }

  public addEstatusFiscal(estatus: Estatus) {
    return this._http.post(this.endpoint + '/estatus_fiscal', estatus, { headers: this.header, observe: 'response' });
  }

  public updateEstatusFiscal(estatus: Estatus) {
    return this._http.put(this.endpoint + '/estatus_fiscal', estatus, { headers: this.header, observe: 'response' });
  }
  public getEstatusFiscalId(id) {
    return this._http.get(this.endpoint + '/estatus_fiscal/id/' + id, { headers: this.header, observe: 'response' });
  }


}
