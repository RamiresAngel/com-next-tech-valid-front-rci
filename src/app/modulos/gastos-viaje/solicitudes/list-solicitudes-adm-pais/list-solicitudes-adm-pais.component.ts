import { Component, OnInit, ViewChild } from '@angular/core';
import { FiltroSolicitudes, FiltroGastosViaje } from 'src/app/entidades';
import { ListSolicitudesAdmMxComponent } from '../list-solicitudes-adm-mx/list-solicitudes-adm-mx.component';

@Component({
  selector: 'app-list-solicitudes-adm-pais',
  templateUrl: './list-solicitudes-adm-pais.component.html',
  styleUrls: ['./list-solicitudes-adm-pais.component.css']
})
export class ListSolicitudesAdmPaisComponent implements OnInit {
  @ViewChild('listSolicitudViaje') listSolicitudViaje: ListSolicitudesAdmMxComponent;


  public pais: string;
  public filtro_anticipo = new FiltroSolicitudes();
  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }
  actualizarTabla(filtro?: FiltroGastosViaje) {
    if (filtro) {
      this.listSolicitudViaje.actualizarTabla(filtro);
    }
    this.listSolicitudViaje.actualizarTabla();
  }

}
