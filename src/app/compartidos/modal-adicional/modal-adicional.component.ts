import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-modal-adicional',
  templateUrl: './modal-adicional.component.html',
  styleUrls: ['./modal-adicional.component.css']
})
export class ModalAdicionalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  cerrarModalDetalle() {
    $('#modal_adicionales').modal('hide');
  }

}
