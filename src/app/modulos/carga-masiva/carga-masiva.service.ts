import { Injectable } from '@angular/core';
import { HttpClient2 } from 'src/app/compartidos/servicios_compartidos/http-clien.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { CargaMasiva, FiltroCargaMasiva } from 'src/app/entidades';

@Injectable({
  providedIn: 'root'
})
export class CargaMasivaService {

  constructor(
    private global: GlobalsComponent,
    private _http: HttpClient2
  ) { }

  public listarLotes(filtroLotes: FiltroCargaMasiva) {
    return this._http.post(`${this.global.host_documentos}/carga_masiva/lotes`,
      {
        "draw": 1,
        "length": 10,
        "start": 0,
        "search": {
          "value": ""
        },
        "filt": filtroLotes,
        "order": [{
          "dir": "asc"
        }],
        "columns": [{
          "dir": "asc"
        }]
      }
    )
  }

  public cargarLote(lote_carga: CargaMasiva) {
    return this._http.post(`${this.global.host_documentos}/carga_masiva`, lote_carga);
  }

  public obtenerValidacionLote(identificador_lote: string) {
    return this._http.get(`${this.global.host_documentos}/carga_masiva/validaciones/${identificador_lote}/lote`)
  }

}
