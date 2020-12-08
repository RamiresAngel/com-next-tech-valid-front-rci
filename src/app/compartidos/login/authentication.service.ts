import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../entidades/usuario';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { GlobalsComponent } from './../globals/globals.component';

@Injectable()
export class AuthenticationService {


  constructor(private http: Http, private globalComponent: GlobalsComponent) { }

  private basePath = '/api/authenticate/';

  login(username: string, password: string): Observable<Usuario> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.globalComponent.hostSso}/api/v1/sso/login`, {
      email: username,
      password: password
    }, options).pipe(map(this.extractData));
  }
  loginAlternativo(user_name: string, password: string, identificador_corporativo) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.globalComponent.host_corporativo}/usuario/login/general_back`, { user_name, password, identificador_corporativo }, options).pipe(map(this.extractData));
  }

  logout(): Observable<Boolean> {
    return this.http.post(this.basePath + 'logout', {}).pipe(map(this.extractData));
  }

  private extractData(res: Response) {
    const body = res.json();
    return body;
  }

}
