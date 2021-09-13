import { Component, OnInit, Input } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-modulo-detalles-acreedores',
  templateUrl: './modulo-detalles-acreedores.component.html',
  styleUrls: ['./modulo-detalles-acreedores.component.css']
})
export class ModuloDetallesAcreedoresComponent implements OnInit {
  @Input() detalle;
  @Input() detalleAprobacion;
  constructor() { }

  ngOnInit() {
  }

  modalClose() {
    $('#modal-detalles-comp').modal('toggle');
  }
  modalCloseAprobacion() {
    $('#modal-detalles-validacion').modal('hide');
  }
}
