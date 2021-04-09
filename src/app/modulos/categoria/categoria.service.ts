import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { Categoria } from '../../entidades/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private endpoint: string;
  header: HttpHeaders;

  constructor(
    private globalsComponent: GlobalsComponent,
    private storageService: StorageService,
    private _http: HttpClient2
  ) {
    this.endpoint = this.globalsComponent.host;
  }

  public obtenerListaCategoriaCF() {
    return this._http.get(this.globalsComponent.host_corporativo + '/categoria/clave_facto/' + this.globalsComponent.CLAVE_FACTO);
  }

  public ObtenerParametros() {
    return this._http.get(this.globalsComponent.host_corporativo + '/categoria/min');
  }

  public obtenerCategoriaId(id) {
    return this._http.get(this.globalsComponent.host_corporativo + '/categoria/ ' + id + ' /id');
  }

  public guardarCategoria(categoria: Categoria) {
    categoria.clave_facto = this.globalsComponent.CLAVE_FACTO;
    return this._http.post(this.globalsComponent.host_corporativo + '/categoria', categoria);
  }

  public actualizarCategoria(categoria: Categoria) {
    return this._http.put(this.globalsComponent.host_corporativo + '/categoria', categoria);
  }

  public obtenerListadoSolicitudCC(filtro: any) {
    return this._http.post(this.globalsComponent.host_documentos + '/solicitud/gasto_viaje', filtro);
    //   {
    //     draw: 1,
    //     length: 10,
    //     start: 0,
    //     search: {
    //       value: ''
    //     },
    //     filt: {

    //       contributente_identificador: '',
    //       sucursal_identificador: '',
    //       numero_anticipo_sap: '',
    //       fecha_inicio_viaje: '',
    //       fecha_fin_viaje: '',
    //       estatus_sap: 0,
    //       estatus: 0,
    //       destino: '',
    //       listtype: 'list'
    //     },
    //     order: [{
    //       dir: 'asc'
    //     }], columns: [{
    //       dir: 'asc'
    //     }]
    //   }
    // );
  }

}
