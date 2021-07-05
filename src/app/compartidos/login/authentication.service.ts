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

  loginActive(username: string, password: string): Observable<Usuario> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    const request = {
      Application: 9,
      Username: 'jpcruzs',
      Password: 'Pelota9393.,',
      IP: '10.10.10.10',
      Browser: 'Chrome'
    }
    fetch(`${this.globalComponent.host_login_rci}/authenticate`, {
      method: 'POST', // or 'PUT'
      mode: 'cors',
      'headers': {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request), // data can be `string` or {object}!
    }).then(
      (res) => {
        console.log(res);
        res.json()
      })
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
    return this.http.post(`${this.globalComponent.host_login_rci}/authenticate`, request).pipe(map(this.extractData));
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
