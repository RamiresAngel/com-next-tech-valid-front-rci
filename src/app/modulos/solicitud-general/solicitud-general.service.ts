import { Injectable } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { SolicitudAnticipoGastoViaje } from 'src/app/entidades/solicitud-anticipo-gastos-viaje';
import { AnticipoGeneral } from 'src/app/entidades/anticipoGeneral';

@Injectable({
  providedIn: 'root'
})
export class SolicitudGeneralService {

  constructor(
    private globalsComponent: GlobalsComponent,
    private sessionStr: StorageService,
    private _http: HttpClient2
  ) { }

  public actualizarAnticipoGeneral(anticipo: AnticipoGeneral) {
    return this._http.post(this.globalsComponent.host_documentos + '/solicitud/anticipo_general', anticipo);
  }
  public guardaAnticipoGeneral(anticipo: AnticipoGeneral) {
    return this._http.post(`${this.globalsComponent.host_documentos}/solicitud/anticipo_general`, anticipo);
  }

  public obtenerListadoSolicitudGeneral(filtro: any) {
    return this._http.post(this.globalsComponent.host_documentos + '/solicitud/anticipo_general/list',
      {
        draw: 1,
        length: 10,
        start: 0,
        search: {
          value: ''
        },
        filt: {

          contributente_identificador: '',
          sucursal_identificador: '',
          numero_anticipo_sap: '',
          fecha_inicio_viaje: '',
          fecha_fin_viaje: '',
          estatus_sap: 0,
          estatus: 0,
          destino: '',
          listtype: 'list'
        },
        order: [{
          dir: 'asc'
        }], columns: [{
          dir: 'asc'
        }]
      }
    );
  }
}
