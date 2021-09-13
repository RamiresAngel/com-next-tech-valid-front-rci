import { Component, OnInit, ViewChild } from '@angular/core';
import { FiltroSolicitudes } from 'src/app/entidades';
import { ListComprobacionesGeneralMxComponent } from '../list-comprobaciones-general-mx/list-comprobaciones-general-mx.component';

@Component({
  selector: 'app-list-comprobaciones-general',
  templateUrl: './list-comprobaciones-general.component.html',
  styleUrls: ['./list-comprobaciones-general.component.css']
})
export class ListComprobacionesGeneralComponent implements OnInit {
  @ViewChild('tabla_comprobaciones') tablaDocumentos: ListComprobacionesGeneralMxComponent;
  filtro_anticipo = new FiltroSolicitudes();
  public pais: string;
  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }
  actualizarTabla() {
    console.log(this.filtro_anticipo);
    this.tablaDocumentos.actualizarTabla();
  }
}
