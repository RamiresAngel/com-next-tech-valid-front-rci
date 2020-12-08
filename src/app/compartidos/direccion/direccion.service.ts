import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalsComponent } from './../../compartidos/globals/globals.component';
import { Usuario } from './../../entidades/usuario';
import { Localidades } from './../../entidades/localidades';
import { StorageService } from './../../compartidos/login/storage.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Body } from '@angular/http/src/body';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {
  header: HttpHeaders;
  usuario = new Usuario();
  localidad = new Localidades();
  private endpoint: string;
  private endpintExterno: string;
  // tslint:disable-next-line:max-line-length
  constructor(private _http: HttpClient, private globalsComponent: GlobalsComponent, private sessionStr: StorageService, private httpPeticion: Http) {
    this.usuario = this.sessionStr.loadSessionData();
    this.endpoint = this.globalsComponent.host_corporativo + '/catalogos/localidad_group';
    // tslint:disable-next-line:max-line-length
    this.header = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': '5b2d486bbb7fdf24cc62c90f' });

  }
  public getProvincias(): Observable<any> {
    this.localidad.nombre = '';
    this.localidad.tipo = 'Provincia';
    return this._http.post(this.endpoint, this.localidad, { headers: this.header, observe: 'response' });
  }

  private extractData(res: Response) {
    const body = res.json();
    return body;
  }


  public getCanton(provincia: string) {
    this.localidad.nombre = '';
    this.localidad.provincia = provincia;
    this.localidad.tipo = 'Canton';
    return this._http.post(this.endpoint, this.localidad, { headers: this.header, observe: 'response' });
  }
  public getDistrito(provincia: string, canton: string) {
    this.localidad.nombre = '';
    this.localidad.provincia = provincia;
    this.localidad.canton = canton;
    this.localidad.tipo = 'Distrito';
    return this._http.post(this.endpoint, this.localidad, { headers: this.header, observe: 'response' });
  }
  public getBarrio(provincia: string, canton: string, distrito: string) {
    this.localidad.nombre = '';
    this.localidad.provincia = provincia;
    this.localidad.canton = canton;
    this.localidad.distrito = distrito;
    this.localidad.tipo = 'Barrio';
    return this._http.post(this.endpoint, this.localidad, { headers: this.header, observe: 'response' });
  }
}
