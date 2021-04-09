import { Component, OnInit, ViewChild } from '@angular/core';
import { FiltroOrdenesCompra, Usuario } from 'src/app/entidades/index';
import { ListOrdenCompraMxComponent } from '../list-orden-compra-mx/list-orden-compra-mx.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';

@Component({
  selector: 'app-list-orden-compra',
  templateUrl: './list-orden-compra.component.html',
  styleUrls: ['./list-orden-compra.component.css']
})
export class ListOrdenCompraComponent implements OnInit {
  public filtroConsulta = new FiltroOrdenesCompra();
  @ViewChild('tablaOrdenesCompra') tablaOrdenesCompra: ListOrdenCompraMxComponent;

  pais: string;
  usuario: Usuario;
  constructor(
    private storageService: StorageService
  ) {
    this.usuario = this.storageService.getDatosIniciales().usuario;
    this.pais = this.usuario.pais ? this.usuario.pais : 'MX';
  }

  ngOnInit() {
  }

  actualizarTabla() {
    if (this.tablaOrdenesCompra) {
      this.tablaOrdenesCompra.actualizarTabla();
    }
  }
}
