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
    const sin_fecha = this.detalleAprobacion.filter
    this.aux_detalle_aprobacion = this.detalleAprobacion.map(aprobacion => {
      aprobacion.fecha = this.getHourOfDay(aprobacion['fecha_aprobacion']);
      return aprobacion;
    });
    const sinAprobar = this.detalleAprobacion.filter(x => x.fecha_aprobacion === '');
    const aprobados = this.detalleAprobacion.filter(x => x.fecha_aprobacion !== '');
    const fechasOrdenadas = aprobados.sort((a, b) => (b.fecha[0] - a.fecha[0]));
    this.aux_detalle_aprobacion = [...sinAprobar, ...fechasOrdenadas];
  }

  modalCloseAprobacion() {
    $('#modal-detalles-aprobacion').modal('toggle');
  }

  getHourOfDay(data) {
    const today = data ? new Date(data) : new Date();
    return [
      today.getTime(),
      today.getHours(),
      today.getMinutes(),
      today.getSeconds(),
    ];
  }
  ordenarFechas(a, b) {
    return b.fecha[0] - a.fecha[0];
  }


}
