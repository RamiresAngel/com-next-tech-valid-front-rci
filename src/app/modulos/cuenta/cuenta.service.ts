import { Injectable } from '@angular/core';
import { Cuenta } from 'src/app/entidades/Cuenta';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  endpoint: string;
  constructor(
    private globalsComponent: GlobalsComponent,
    private _http: HttpClient2
  ) {
    this.endpoint = this.globalsComponent.host_corporativo + '/cuenta/';
  }

  public obtenerCuentaCorporativo(identificador_corporativo: string) {
    return this._http.get(this.endpoint + identificador_corporativo + '/corporativo');
  }


  public crearCuenta(cuenta: Cuenta) {
    return this._http.post(this.endpoint, cuenta);
  }

  public obtenerCuetnaId(identificador_cuenta: string) {
    return this._http.get(this.endpoint + identificador_cuenta);
  }

  public actualizarCuenta(cuenta: Cuenta) {
    return this._http.put(this.endpoint, cuenta);
  }

  public obtenerCuentasMin(identificador_corporativo, id_user: string, id_rol: number) {
    return this._http.get(`${this.globalsComponent.host_corporativo}/cuenta/${identificador_corporativo}/corporativo/min/${id_user}/usuario/${id_rol}/rol`);
  }
  /* Consultas de formulario RCI */

  public obtenerCorporativoCuentaRci(identificador_cuenta: string) {
    return this._http.get(this.endpoint + identificador_cuenta + '/corporativo');
  }

  public obtenerCuetnaIdRci(identificador_cuenta: string) {
    return this._http.get(this.endpoint + identificador_cuenta);
  }

  public crearRci(cuenta: Cuenta) {
    // console.log(cuenta);
    const aux_cuenta = {
      cuenta: cuenta.cuenta,
      identificador_corporativo: cuenta.identificador_corporativo,
      identificador_tipo_cuenta: cuenta.identificador_tipo_cuenta,
      codigo: cuenta.codigo,
      descripcion: cuenta.descripcion,
      estatus: cuenta.estatus,
      deducible: cuenta.deducible,
      identificador_nivel_gasto: cuenta.identificador_nivel_gasto
    };
    // console.log(aux_cuenta);
    return this._http.post(this.endpoint, aux_cuenta);
  }

  public actualizarRci(cuenta) {
    // console.log(cuenta);
    const aux_cuenta = {
      id: cuenta.id,
      cuenta: cuenta.cuenta,
      identificador: cuenta.identificador,
      estatus: cuenta.estatus,
      deducible: cuenta.deducible,
    };
    // console.log(aux_cuenta);
    return this._http.put(this.endpoint + 'rci', aux_cuenta);
  }

}
