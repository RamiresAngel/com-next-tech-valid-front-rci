import { Component, Input, OnInit } from '@angular/core';
import { FiltroSolicitudes } from 'src/app/entidades';

@Component({
  selector: 'app-list-facturas-proveedor-rci',
  templateUrl: './list-facturas-proveedor-rci.component.html',
  styleUrls: ['./list-facturas-proveedor-rci.component.css']
})
export class ListFacturasProveedorRciComponent implements OnInit {
  @Input() filtroConsulta: FiltroSolicitudes;
  @Input() mostrar_boton;


  constructor() { }

  ngOnInit() {
  }

}
