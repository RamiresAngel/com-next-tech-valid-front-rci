import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Impuesto, SiteMoneda, Usuario } from 'src/app/entidades';
import { UsuarioService } from '../usuario.service';
declare var $: any;


@Component({
  selector: 'app-modal-sitio-rci',
  templateUrl: './modal-sitio-rci.component.html',
  styleUrls: ['./modal-sitio-rci.component.css']
})
export class ModalSitioRciComponent implements OnChanges {

  @Input() usuario = new Usuario();
  lista_sitio = new Array<SiteMoneda>();

  constructor(
    private _usuarioService: UsuarioService
  ) { }

  public cerrarModal() {
    $('#ModalSitio').modal('toggle');
  }

  ngOnChanges() {
    if (this.usuario && this.usuario.rfc) {
      this._usuarioService.getSiteMoneda(this.usuario.rfc).subscribe(
        (data: Array<SiteMoneda>) => {
          this.lista_sitio = data;
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }

}
