import { Component, OnInit, Input } from '@angular/core';
import { DetalleAmortizacion } from 'src/app/entidades';
declare var $: any;
@Component({
  selector: 'app-modal-detalles-amortizacion',
  templateUrl: './modal-detalles-amortizacion.component.html',
  styleUrls: ['./modal-detalles-amortizacion.component.css']
})
export class ModalDetallesAmortizacionComponent implements OnInit {
  @Input() data: DetalleAmortizacion;
  @Input() detalleAprobacion: any;
  constructor() { }

  ngOnInit() {
  }

  modalClose() {
    $('#modal-det-amortizacion').modal('toggle');
  }
  modalCloseAprobacion() {
    $('#modal-detalles-validacion').modal('toggle');
  }

}
