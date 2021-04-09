import { ListProveedoresRciComponent } from './../list-proveedores-rci/list-proveedores-rci.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FiltroProveedor } from 'src/app/entidades/filtro';
import { ListProveedoresMxComponent } from '../list-proveedores-mx/list-proveedores-mx.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';

@Component({
  selector: 'app-list-proveedores-pais',
  templateUrl: './list-proveedores-pais.component.html',
  styleUrls: ['./list-proveedores-pais.component.css']
})
export class ListProveedoresPaisComponent implements OnInit {

  public pais: string;
  public vista_carga: any;
  datos_inciales: DatosIniciales;
  public tipo_erp: string;
  public filtroConsulta = new FiltroProveedor();
  @ViewChild('tablaProveedores') tablaProveedores: ListProveedoresMxComponent;
  @ViewChild('tablaProveedoresRci') tablaProveedoresRci: ListProveedoresRciComponent;

  constructor(
    private storageService: StorageService,
  ) {
    const axu_vista = this.storageService.getDatosIniciales().funcionalidades.find(o => (o.clave === 'MOD_FLUJO') || (o.clave === 'VISTA_CARGADOC')).valor;
    const axu_usuario = this.storageService.getDatosIniciales().usuario.pais;
    if (axu_vista === 'mod_rci') {
      this.vista_carga = axu_vista;
      this.pais = '';
    } else {
      if (axu_usuario === 'MX') {
        this.pais = axu_usuario;
        this.vista_carga = '';
      } else {
        this.pais = 'CR';
        this.vista_carga = '';
      }
    }
  }

  ngOnInit() { }

  actualizarTabla() {
    if (this.vista_carga === 'mod_rci') {
      this.tablaProveedoresRci.actualizarTabla();
      return;
    }
    this.tablaProveedores.actualizarTabla();
  }

}
