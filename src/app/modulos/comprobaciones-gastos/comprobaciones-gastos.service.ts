import { filtroComprobacionGastos } from './../../entidades/filtroComprobacionGastos';
import { filtroComprobacion } from './../../entidades/Filtro-Solicitudes.';
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
  listarComprobaciones(filtro: filtroComprobacionGastos) {
    const aux_filtro = {
      estatus: filtro.activo,
      fecha_fin: filtro.fecha_fin,
      fecha_inicio: filtro.fecha_inicio,
      folio_comprobacion: Number(filtro.folio_comprobacion),
      identificador_cc: filtro.identificador_cc,
      identificador_contribuyente: filtro.identificador_contribuyente,
      identificador_corporativo: filtro.identificador_corporativo,
      identificador_usuario: filtro.identificador_usuario,
      tipo_gasto: filtro.tipo_gasto,
    };
    return this.http.post(`${this.globals.host_gastos_viaje}/comprobacion/cabecera/list`, aux_filtro);
  }
  obtenerComprobacionId(id_comprobacion: ComprobacionGastosHeader) {
    return this.http.get(`${this.globals.host_gastos_viaje}/comprobacion/cabecera/${id_comprobacion}/folio_comprobacion`);
  }

  eliminarComprobacion(id_comprobacion: number) {
    return this.http.delete(`${this.globals.host_gastos_viaje}/comprobacion/cabecera/${id_comprobacion}/folio_comprobacion`);
  }

}
