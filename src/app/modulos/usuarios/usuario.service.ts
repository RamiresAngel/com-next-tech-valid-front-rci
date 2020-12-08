import { Injectable } from '@angular/core';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { Usuario } from 'src/app/entidades/usuario';
import { PrestacionSaldoUsuario } from 'src/app/entidades';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  endpoint: string;

  constructor(private _http: HttpClient2, private _globals: GlobalsComponent) {
    this.endpoint = this._globals.host_corporativo + '/usuario/';
  }

  crearUsuario(usuario: Usuario) {
    return this._http.post(this.endpoint, usuario);
  }

  actualizarCCusuario(usuario: Usuario) {
    return this._http.put(this.endpoint, usuario);
  }

  obtenerUsuariosCorporativo(id_corporativo: string) {
    return this._http.get(this.endpoint + id_corporativo + '/corporativo');
  }
  obtenerUsuariosCorporativoAndProveedor(id_corporativo: string) {
    return this._http.get(`${this.endpoint}${id_corporativo}/corporativo/correos`);
    // return this._http.get(this.endpoint + id_corporativo + '/corporativo');
  }

  obtnerUsuariosCorporativoMin(id_corporativo: string) {
    return this._http.get(this.endpoint + id_corporativo + '/min');
  }

  obtnerUsuariosCorporativoId(id_corporativo: string) {
    return this._http.get(this.endpoint + id_corporativo + '/min');
  }

  obtnerUsuariosMinCorporativo(id_corporativo: string) {
    return this._http.get(this.endpoint + id_corporativo + '/min');
  }

  obtnerUsuariosParaAprobar(id_corporativo: string, id_flujo: number) {
    return this._http.get(`${this.endpoint}${id_corporativo}/min/${id_flujo}/aprobacion`);
  }

  obtnerUsuarioId(id_usuario: string) {
    return this._http.get(this.endpoint + 'id/' + id_usuario);
  }

  obtnerUsuarioByIdentificadorSucursal(identificador_sucursal: string) {
    return this._http.get(this.endpoint + identificador_sucursal + '/sucursal');
  }

  /* apis para la parte de RCI */

  actualizarSaldo(usuario) {
    console.log(usuario);
    return;
  }

  crearRci(usuario) {
    console.log(usuario);
    return;
  }

  actualizarUsuarioExtraInfo(usuario: Usuario) {
    return this._http.put(`${this.endpoint}update_extra_info`, usuario);
  }

  addSaldoUsuario(saldo: PrestacionSaldoUsuario) {
    if (saldo.id) {
      return this._http.put(`${this.endpoint}add/saldo`, saldo);
    } else {
      return this._http.post(`${this.endpoint}add/saldo`, saldo);
    }
  }

  getSaldosPrestacion(identificador_usuario: string) {
    return this._http.get(`${this.endpoint}saldo/${identificador_usuario}`);
  }

  delSaldoUsuario(id_saaldo: number) {
    return this._http.delete(`${this.endpoint}saldo/${id_saaldo}`);
  }

  getSiteMoneda(rfc: string) {
    return this._http.get(`${this.endpoint}${rfc}/moneda_site`);
  }

  obtenerUsuariosCorporativo_extra_info(id_corporativo: string) {
    return this._http.get(this.endpoint + id_corporativo + '/corporativo_extra_info');
  }

  resetearSaldos() {
    return this._http.get(this.endpoint + 'reset/saldos');
  }


}
