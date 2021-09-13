import { Component, ViewChild, Input } from '@angular/core';
import { ListAcreedoresDiversosRdComponent } from './list-acreedores-diversos-rd/list-acreedores-diversos-rd.component';
import { FiltroSolicitudes } from 'src/app/entidades';
import { StorageService } from 'src/app/compartidos/login/storage.service';

@Component({
  selector: 'app-acreedores-diversos-rd',
  templateUrl: './acreedores-diversos-rd.component.html',
  styleUrls: ['./acreedores-diversos-rd.component.css']
})
export class AcreedoresDiversosRdComponent {
  @ViewChild('listSolicitudCCRd') listSolicitudCCRd: ListAcreedoresDiversosRdComponent;
  @Input() mostrar_btn;
  @Input() filtro_anticipo: FiltroSolicitudes;
  constructor(
    private storage: StorageService
  ) {
  }

  actualizarTabla(filtro) {
    this.listSolicitudCCRd.actualizarTabla(filtro);
  }

}