import { Component, OnInit, Input } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-modal-detalles',
  templateUrl: './modal-detalles.component.html',
  styleUrls: ['./modal-detalles.component.css']
})
export class ModalDetallesComponent implements OnInit {
  @Input() titulo = 'Detalles';
  @Input() lista_conceptos: any;

  constructor() { }

  ngOnInit() {
  }

  modalClose() {
    $('#modal_detalles').modal('toggle');
  }

}
