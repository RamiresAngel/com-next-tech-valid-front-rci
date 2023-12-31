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

  loginActive(username: string, password: string, ip?): Observable<Usuario> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    let ip_enviar;
    if (ip) {
      ip_enviar = JSON.parse(ip._body).ip;
    }
    const request = {
      Application: 9,
      Username: username,
      Password: password,
      IP: ip_enviar,
      Browser: 'Microsoft Edge'
    }
    return this.http.post(`${this.globalComponent.host_login_rci}/authenticate`, request).pipe(map(this.extractData));
  }

  public getIPAddress() {
    return this.http.get("http://api.ipify.org/?format=json");
  }


  loginAlternativoActive(user_name: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.globalComponent.host_corporativo}/usuario/login/directory`, { user_name }, options).pipe(map(this.extractData));
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

  login_cognito(user_name: string, password = '', identificador_corporativo = 'acebbe79-f8ef-4bac-a53c-a1f1b785e84d'): Observable<Usuario> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`http://localhost:8080/api/v1/validm/corporativo/usuario/login/remote_login`, { user_name, password, identificador_corporativo }, options).pipe(map(this.extractData));
  }


}
