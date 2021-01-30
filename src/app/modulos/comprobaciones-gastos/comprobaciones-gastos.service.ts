import { ComprobacionGastosHeader } from 'src/app/entidades/ComprobacionGastosHeader';
import { HttpClient2 } from './../../compartidos/servicios_compartidos/http-clien.service';
import { GlobalsComponent } from './../../compartidos/globals/globals.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComprobacionesGastosService {
  constructor(
    private globals: GlobalsComponent,
    private http: HttpClient2
  ) { }

  public obtenerDetallesXML(xml: { xml: string }) {
    return this.http.post(`${this.globals.host_documentos}/xml_detalles`, xml);
  }

  getDatosIdCorporatico(id_corporativo: string) {
    console.log(`Api para consumir por el ${id_corporativo} `);
    return this.http.get('');
  }

  guardarHeaderComprobacion(header: ComprobacionGastosHeader) {
    return this.http.post(`${this.globals.host_gastos_viaje}/comprobacion/cabecera`, header);
  }

}
