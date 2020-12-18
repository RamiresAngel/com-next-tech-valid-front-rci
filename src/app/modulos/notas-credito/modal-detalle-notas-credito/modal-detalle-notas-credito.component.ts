import { Component, Input, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-modal-detalle-notas-credito',
  templateUrl: './modal-detalle-notas-credito.component.html',
  styleUrls: ['./modal-detalle-notas-credito.component.css']
})
export class ModalDetalleNotasCreditoComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }
  modalClose() {
    $('#modal-detalle-notas-credito').modal('toggle');
  }

}
