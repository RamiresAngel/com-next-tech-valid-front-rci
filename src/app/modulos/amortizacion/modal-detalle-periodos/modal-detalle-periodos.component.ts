import { Component, OnInit, Input } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-modal-detalle-periodos',
  templateUrl: './modal-detalle-periodos.component.html',
  styleUrls: ['./modal-detalle-periodos.component.css']
})
export class ModalDetallePeriodosComponent implements OnInit {
  @Input() detalle_periodos;
  @Input() monto_total;
  constructor() { }
  ngOnInit() {
    console.log(this.detalle_periodos);

  }

  modalClose() {
    $('#modal-periodos-amortizacion').modal('toggle');
  }

}
