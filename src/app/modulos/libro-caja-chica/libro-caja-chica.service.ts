import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { Libro } from 'src/app/entidades/libro-caja-chica';


@Injectable({
  providedIn: 'root'
})
export class LibroCajaChicaService {
  header: HttpHeaders;

  constructor(
    private globalsComponent: GlobalsComponent
    , private sessionStr: StorageService
    , private _http: HttpClient2
  ) { }

  // Esta mal
  public ObtenerContribuyente() {
    return this._http.get(this.globalsComponent.host_corporativo + '/contribuyente/mx');
  }

  // estamal
  public ObtenerSucursal() {
    return this._http.get(this.globalsComponent.host_corporativo + '/sucursal/mx/');
  }


  public ObtenerListaLibroCajaChica() {
    return this._http.get(this.globalsComponent.host_administracion + '/libro_caja_chica/');
  }


  public ObtenerByCorporativo(identificador_corporativo: string) {
    return this._http.get(this.globalsComponent.host_administracion + '/libro_caja_chica/' + identificador_corporativo + '/corporativo');
  }

  public ObtenerLibroById(id: number) {
    return this._http.get(this.globalsComponent.host_administracion + '/libro_caja_chica/' + id + '/id');
  }

  public GuardarLibroCajaChica(libro_caja_chica: Libro) {
    return this._http.post(this.globalsComponent.host_administracion + '/libro_caja_chica/', libro_caja_chica);
  }

  public ActualizarLibroCajaChica(libro_caja_chica: Libro) {
    return this._http.put(this.globalsComponent.host_administracion + '/libro_caja_chica/', libro_caja_chica);
  }


}


