import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FiltroSolicitudes } from 'src/app/entidades';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { ListFacturasProveedorMxComponent } from '../list-facturas-proveedor-mx/list-facturas-proveedor-mx.component';
import { ListFacturasProveedorRdComponent } from '../list-facturas-proveedor-rd/list-facturas-proveedor-rd.component';

@Component({
  selector: 'app-list-facturas-proveedor-pais',
  templateUrl: './list-facturas-proveedor-pais.component.html',
  styleUrls: ['./list-facturas-proveedor-pais.component.css']
})
export class ListFacturasProveedorPaisComponent implements OnInit {

  @ViewChild('listFacturasProveedorMx') listFacturasProveedorMx: ListFacturasProveedorMxComponent;
  @ViewChild('listFacturasProveedorRd') listFacturasProveedorRd: ListFacturasProveedorRdComponent;
  @Input() mostrar_boton;
  public filtro_facturas_proveedor = new FiltroSolicitudes();
  public pais: string;
  public tipo_gastos: string;

  constructor(
    private storage: StorageService
  ) {
    this.tipo_gastos = this.storage.getDatosIniciales().funcionalidades.find(o => (o.clave === 'MOD_FLUJO') || (o.clave === 'VISTA_CARGADOC')).valor;
  }

  ngOnInit() {
    if (this.storage.getDatosIniciales().usuario.pais) {
      this.pais = this.storage.getDatosIniciales().usuario.pais;
    } else {
      this.pais = 'MX';
    }
    this.filtro_facturas_proveedor.estatus = 1;
  }

  actualizarTabla(filtro) {
    switch (this.pais) {
      case 'RD':
        this.filtro_facturas_proveedor = filtro;
        this.listFacturasProveedorRd.actualizarTabla(filtro);
        break;

      default:
        this.filtro_facturas_proveedor = filtro;
        this.listFacturasProveedorMx.actualizarTabla(filtro);
    }
  }

}
