import { Component, OnInit, ViewChild } from '@angular/core';
import { FiltroProveedor } from 'src/app/entidades/index';
import { ListUsuarioProveedorMxComponent } from '../list-usuario-proveedor-mx/list-usuario-proveedor-mx.component';
@Component({
  selector: 'app-list-usuario-proveedor',
  templateUrl: './list-usuario-proveedor.component.html',
  styleUrls: ['./list-usuario-proveedor.component.css']
})
export class ListUsuarioProveedorComponent implements OnInit {

  public pais = 'mx';
  public filtroConsulta = new FiltroProveedor();
  @ViewChild('tablaProveedores') tablaProveedores: ListUsuarioProveedorMxComponent;

  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }

  actualizarTabla() {
    this.tablaProveedores.actualizarTabla();
  }
}
