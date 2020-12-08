import { Injectable } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { identifierModuleUrl } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { RecuperarPassword, RessetPassword } from 'src/app/entidades';

@Injectable({
  providedIn: 'root'
})
export class DynamicLoginService {

  private endpoint: string;

  constructor(private _http: HttpClient, private _globals: GlobalsComponent) {
    this.endpoint = this._globals.host_corporativo;
  }

  public obtenerInfoCorporativo(identficador_corporativo) {
    return this._http.get(`${this.endpoint}/corporativo/${identficador_corporativo}`);
  }
  public loginProveedor(usr: string, pass: string, corp: string) {
    return this._http.post(`${this._globals.host_corporativo}/usuario/${corp}/proveedor/login`, { rfc: usr, password: pass });
  }
  public recuperarPassword(recuperar_password: RecuperarPassword) {
    return this._http.put(`${this.endpoint}/usuario/proveedor/recuperar_password`, recuperar_password);
  }
  public resetPassword(reset_password: RessetPassword) {
    return this._http.put(`${this.endpoint}/usuario/proveedor/reset_password`, reset_password);
  }
  getTokenRessetPass(email: string) {
    // return this._http.get(`${this._globals.hostSso}/sso/reset_password_request?email=${email}`);
    return this._http.get(`${this._globals.hostSso}/api/v1/sso/reset_password_request?email=${email}`);
  }
  ressetPasswordSSO(token: string, email: string, newPassword: string) {
    return this._http.post(`${this._globals.hostSso}/api/v1/sso/reset_password`, {
      // return this._http.post(`${this._globals.hostSso}/sso/reset_password`, {
      token,
      email,
      newPassword
    });
  }

  obtenerCorporativoByCorreo(correo: string) {
    return this._http.get(`${this._globals.host_corporativo}/usuario/corporativo_by/${correo}/correo`);
  }
}
