import { Component, OnInit, Input, OnChanges } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-modal-detalles-aprobacion',
  templateUrl: './modal-detalles-aprobacion.component.html',
  styleUrls: ['./modal-detalles-aprobacion.component.css']
})
export class ModalDetallesAprobacionComponent implements OnInit, OnChanges {
  @Input() detalleAprobacion: Array<any>;
  public aux_detalle_aprobacion: Array<any>;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.aux_detalle_aprobacion = this.detalleAprobacion.sort((a, b) => {
      if (new Date(a.fecha_aprobacion).getTime() > new Date().getTime()) {
        return (a.fecha_aprobacion ? new Date(a.fecha_aprobacion).getTime() : new Date().getTime()) -
          (b.fecha_aprobacion ? new Date(b.fecha_aprobacion).getTime() : new Date().getTime());
      }
      return (b.fecha_aprobacion ? new Date(b.fecha_aprobacion).getTime() : new Date().getTime()) -
        (a.fecha_aprobacion ? new Date(a.fecha_aprobacion).getTime() : new Date().getTime());
    });
  }

  modalCloseAprobacion() {
    $('#modal-detalles-aprobacion').modal('toggle');
  }

}
