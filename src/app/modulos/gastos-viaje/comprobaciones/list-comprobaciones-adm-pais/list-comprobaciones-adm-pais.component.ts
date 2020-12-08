import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FiltroSolicitudes } from 'src/app/entidades';
import { ListComprobacionesMxComponent } from '../list-comprobaciones-mx/list-comprobaciones-mx.component';

@Component({
  selector: 'app-list-comprobaciones-adm-pais',
  templateUrl: './list-comprobaciones-adm-pais.component.html',
  styleUrls: ['./list-comprobaciones-adm-pais.component.css']
})
export class ListComprobacionesAdmPaisComponent implements OnInit {
  @ViewChild('tabla_comprobaciones') tabla_comprobaciones: ListComprobacionesMxComponent;
  @Input() bandeja_aprobacion;


  public pais: string;
  public filtro_anticipo = new FiltroSolicitudes();
  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }
  filtrar(filtro) {
    this.tabla_comprobaciones.actualizarTabla(filtro);
    if (this.bandeja_aprobacion) {
      filtro.aprobador = 1;
    }
  }

}
