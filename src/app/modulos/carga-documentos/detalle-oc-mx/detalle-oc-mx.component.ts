import { Usuario } from './../../../entidades/usuario';
import { Component, OnInit, Input } from '@angular/core';
import { OrdenCompra } from '../../../entidades/index';
declare var $: any;

@Component({
  selector: 'app-detalle-oc-mx',
  templateUrl: './detalle-oc-mx.component.html',
  styleUrls: ['./detalle-oc-mx.component.css']
})
export class DetalleOcMxComponent implements OnInit {

  @Input() orden_oc: OrdenCompra;
  @Input() usuario: Usuario;


  constructor(
  ) {
  }

  ngOnInit() {
    // console.log(this.orden_oc);
    // Solicitar datos de la orden de compra
  }


  public abrirDetalleOC(): void {
    $('#modal-oc').modal('toggle');
  }
  public abrirDocsRelacioandos(): void {
    $('#modal-docs-rel').modal('toggle');
  }

}
