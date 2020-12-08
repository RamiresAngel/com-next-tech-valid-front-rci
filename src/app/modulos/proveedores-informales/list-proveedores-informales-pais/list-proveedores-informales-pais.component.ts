import { Component, Input, ViewChild } from '@angular/core';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { FiltroSolicitudes } from 'src/app/entidades';
import { ListProveedoresInformalesRdComponent } from '../list-proveedores-informales-rd/list-proveedores-informales-rd.component';

@Component({
  selector: 'app-list-proveedores-informales-pais',
  templateUrl: './list-proveedores-informales-pais.component.html',
  styleUrls: ['./list-proveedores-informales-pais.component.css']
})
export class ListProveedoresInformalesPaisComponent {
  @ViewChild('tabla_provedor_informal') tabla_provedor_informal: ListProveedoresInformalesRdComponent;

  @Input() mostrar_boton = true;
  public filtro_anticipo = new FiltroSolicitudes();
  public pais = 'mx';

  constructor(
    private storage: StorageService
  ) {
    if (this.storage.getDatosIniciales().usuario.pais) {
      this.pais = this.storage.getDatosIniciales().usuario.pais;
    } else {
      this.pais = 'MX';
    }
  }

  filtrar(filtro) {
    switch (this.pais) {
      case 'RD':
        if (this.tabla_provedor_informal) {
          this.tabla_provedor_informal.filtrar(filtro);
        }
        break;

      default:

        break;
    }
  }


}
