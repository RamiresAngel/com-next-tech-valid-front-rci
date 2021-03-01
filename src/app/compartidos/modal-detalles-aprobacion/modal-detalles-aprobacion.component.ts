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

  ngOnChanges(detalleAprobacion) {
    this.aux_detalle_aprobacion = detalleAprobacion.detalleAprobacion.currentValue.sort((a: any, b: any) => {
      return new Date(b.fecha_aprobacion).getTime() - new Date(a.fecha_aprobacion).getTime();
    })
  }

  modalCloseAprobacion() {
    $('#modal-detalles-aprobacion').modal('toggle');
  }

}
