import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FiltroGastosViaje } from 'src/app/entidades';
import { ListComprobacionesMxComponent } from '../list-comprobaciones-mx/list-comprobaciones-mx.component';

@Component({
  selector: 'app-list-comprobaciones-pais',
  templateUrl: './list-comprobaciones-pais.component.html',
  styleUrls: ['./list-comprobaciones-pais.component.css']
})
export class ListComprobacionesPaisComponent implements OnInit {
  @ViewChild('tabla_comprobaciones') tabla_comprobaciones: ListComprobacionesMxComponent;
  @Input() bandeja_aprobacion;
  @Input() mostrar_btn = true;

  public filtro_anticipo = new FiltroGastosViaje();
  pais = 'mx';
  constructor() { }

  ngOnInit() {
  }

  filtrar(filtro) {
    this.tabla_comprobaciones.actualizarTabla(filtro);
    if (this.bandeja_aprobacion) {
      filtro.aprobador = 1;
    }
    console.log('filtrar');

  }

}
