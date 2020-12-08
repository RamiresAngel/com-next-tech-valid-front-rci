import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FiltroGastosViaje } from 'src/app/entidades';
import { ListSolicitudesMxComponent } from '../list-solicitudes-mx/list-solicitudes-mx.component';

@Component({
  selector: 'app-list-solicitudes-pais',
  templateUrl: './list-solicitudes-pais.component.html',
  styleUrls: ['./list-solicitudes-pais.component.css']
})
export class ListSolicitudesPaisComponent implements OnInit {
  @ViewChild('listSolicitudViaje') listSolicitudViaje: ListSolicitudesMxComponent;
  @Input() mostrar_btn = true;
  @Input() bandeja_aprobacion: boolean;
  public filtro_anticipo = new FiltroGastosViaje();
  public pais: string;
  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }

  actualizarTabla(filtro?: FiltroGastosViaje) {
    if (filtro) {
      this.listSolicitudViaje.actualizarTabla(filtro);
      return;
    }
    this.listSolicitudViaje.actualizarTabla();
  }
}