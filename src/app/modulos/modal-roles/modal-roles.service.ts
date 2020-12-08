import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RolesCC } from '../../entidades/roles-cc';
import { Roles } from '../../entidades/roles-cc';
import { CentrosConsumo } from '../../entidades/roles-cc';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { GlobalsComponent } from './../../compartidos/globals/globals.component';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ModalRolesService {

  public rolescc: any;

  constructor(private http: Http, private globalsComponent: GlobalsComponent) { }

  obtenerDatosIniciales(username: string): Observable<RolesCC> {
    const token = '5b2d486bbb7fdf24cc62c90f';
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.globalsComponent.host_corporativo}/usuario/${username}/roles/`, options).pipe(map(this.extractData));
  }

  getAcciones(rol_id: string): Observable<RolesCC> {
    const token = '5b2d486bbb7fdf24cc62c90f';
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    const options = new RequestOptions({ headers: headers });
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${this.globalsComponent.host_corporativo}/rol_funcionalidad/${rol_id}/id`, options).pipe(map(this.extractData));
  }

  private extractData(res: Response) {
    const body = res.json();
    return body;
  }

}
