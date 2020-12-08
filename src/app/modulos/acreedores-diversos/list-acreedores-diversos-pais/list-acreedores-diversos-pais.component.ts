import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DatosIniciales } from 'src/app/entidades/DatosIniciales';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { ListAcreedoresDiversosMxComponent } from '../list-acreedores-diversos-mx/list-acreedores-diversos-mx.component';
import { FiltroSolicitudes } from 'src/app/entidades';
import { ListAcreedoresDiversosRdComponent } from '../acreedores-diversos-rd/list-acreedores-diversos-rd/list-acreedores-diversos-rd.component';

@Component({
  selector: 'app-list-acreedores-diversos-pais',
  templateUrl: './list-acreedores-diversos-pais.component.html',
  styleUrls: ['./list-acreedores-diversos-pais.component.css']
})
export class ListAcreedoresDiversosPaisComponent implements OnInit {

  @ViewChild('listSolicitudCC') listSolicitudCC: ListAcreedoresDiversosMxComponent;
  @ViewChild('acreedoresDiversosRd') acreedoresDiversosRd: ListAcreedoresDiversosRdComponent;
  @Input() mostrar_btn = true;
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

  ngOnInit() {
    this.filtro_anticipo.estatus = 1;
    // this.pais = 'mx';
  }

  actualizarTabla(filtro) {

    switch (this.pais) {
      case 'MX':
        this.listSolicitudCC.actualizarTabla(filtro);
        break;
      case 'RD':
        this.acreedoresDiversosRd.actualizarTabla(filtro);
        break;
      default:
        break;
    }
  }
}
