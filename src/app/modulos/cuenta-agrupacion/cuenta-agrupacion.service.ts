import { Injectable } from '@angular/core';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { CuentaAgrupacion } from 'src/app/entidades/CuentaAgrupacion';

@Injectable({
  providedIn: 'root'
})
export class CuentaAgrupacionService {

  endpoint: string;

  constructor(
    private http: HttpClient2,
    private globals: GlobalsComponent
  ) {
    this.endpoint = `${this.globals.host_corporativo}/cuenta_agrupacion/`;
  }

  public obtnerCuetnaAgrupacion(identificador_corporativo, id_user: string, id_rol: number) {
    return this.http.get(`${this.globals.host_corporativo}/cuenta_agrupacion/${identificador_corporativo}/corporativo/${id_user}/usuario/${id_rol}/rol`);
  }
  public crearCuetnaAgrupacion(cuenta_agrupacion: CuentaAgrupacion) {
    return this.http.post(this.endpoint, cuenta_agrupacion);
  }
  public obtenerCuentaAgrupacionSS(filtroCuenta) {
    return this.http.post(this.endpoint + 'list', filtroCuenta);
  }

  public eliminarCuentaAgrupacion(cuenta_agrupacion: CuentaAgrupacion) {
    return this.http.put(this.endpoint + 'delete', cuenta_agrupacion);
  }

}
