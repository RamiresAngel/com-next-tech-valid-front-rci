import { Component, OnInit, Input } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-modal-detalle-periodos-rd',
  templateUrl: './modal-detalle-periodos-rd.component.html',
  styleUrls: ['./modal-detalle-periodos-rd.component.css']
})
export class ModalDetallePeriodosRdComponent implements OnInit {
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
