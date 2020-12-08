import { Component, OnInit, ViewChild } from '@angular/core';
import { ListCodigoMxComponent } from '../list-codigo-mx/list-codigo-mx.component';
import { FiltroCodigosRecepcion, Usuario } from 'src/app/entidades/index';
import { StorageService } from 'src/app/compartidos/login/storage.service';

@Component({
  selector: 'app-list-codigo-pais',
  templateUrl: './list-codigo-pais.component.html',
  styleUrls: ['./list-codigo-pais.component.css']
})
export class ListCodigoPaisComponent {

  public pais: string;
  public filtroConsulta = new FiltroCodigosRecepcion();
  @ViewChild('tablaCodigos') tablaCodigos: ListCodigoMxComponent;
  public usuario: Usuario;
  constructor(
    private storageService: StorageService
  ) {
    this.usuario = this.storageService.getDatosIniciales().usuario;
    this.pais = this.usuario.pais ? this.usuario.pais : 'MX';
  }

  actualizarTabla() {
    if (this.tablaCodigos) {
      this.tablaCodigos.actualizarTabla();
    }
  }


}
