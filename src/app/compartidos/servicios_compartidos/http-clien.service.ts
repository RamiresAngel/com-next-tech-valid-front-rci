import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../login/storage.service';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
@Injectable()
export class HttpClient2 {
  datos_iniciales: DatosIniciales;
  constructor(private http: HttpClient, private _storageService: StorageService) { }

  createAuthorizationHeader() {
    this.datos_iniciales = this._storageService.getDatosIniciales();
    const token = this.datos_iniciales.usuario.token;
    return new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
  }

  get(url) {
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader();
    return this.http.get(url, {
      headers: headers
    });
  }

  post(url, data) {
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader();
    return this.http.post(url, data, {
      headers: headers
    });
  }

  put(url, data) {
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader();
    return this.http.put(url, data, {
      headers: headers
    });
  }

  delete(url) {
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader();
    return this.http.delete(url, {
      headers: headers
    });
  }
}
