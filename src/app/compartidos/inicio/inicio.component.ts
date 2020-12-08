import { Component, OnInit } from '@angular/core';
import { StorageService } from '../login/storage.service';
import { Usuario } from 'src/app/entidades';
declare var $: any;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  usuario_activo: Usuario;
  constructor(
    private _storageService: StorageService
  ) {
  }

  ngOnInit() {
    this.usuario_activo = this._storageService.getDatosIniciales().usuario;
    if (this.usuario_activo.descuento_pp === 1 && this.usuario_activo.reset_password === 0) {
      $('#modal_aviso_pp').modal('show');

    }
  }



}
