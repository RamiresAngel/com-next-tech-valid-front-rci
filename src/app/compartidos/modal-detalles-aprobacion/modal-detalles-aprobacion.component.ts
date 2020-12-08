import { Component, OnInit, Input } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-modal-detalles-aprobacion',
  templateUrl: './modal-detalles-aprobacion.component.html',
  styles: []
})
export class ModalDetallesAprobacionComponent implements OnInit {
  @Input() detalleAprobacion: any;

  constructor() { }

  ngOnInit() {
  }

  modalCloseAprobacion() {
    $('#modal-detalles-aprobacion').modal('toggle');
  }

}
