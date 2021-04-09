import { Component, OnInit, ViewChild } from '@angular/core';
import { ListSolicitudAnticipoCcMxComponent } from '../list-solicitud-anticipo-cc-mx/list-solicitud-anticipo-cc-mx.component';
import { FiltroSolicitudes } from 'src/app/entidades';

@Component({
  selector: 'app-list-solicitud-anticipo-cc-pais',
  templateUrl: './list-solicitud-anticipo-cc-pais.component.html',
  styleUrls: ['./list-solicitud-anticipo-cc-pais.component.css']
})
export class ListSolicitudAnticipoCcPaisComponent implements OnInit {
  @ViewChild('listSolicitudCC') listSolicitudCC: ListSolicitudAnticipoCcMxComponent;
  public filtro_anticipo = new FiltroSolicitudes();
  public pais = 'mx';
  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }

  actualizarTabla() {
    this.listSolicitudCC.actualizarTabla();
  }

}
