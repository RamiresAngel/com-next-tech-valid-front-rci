import { Component, OnInit, Input } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-modal-detalle-proveedor-informal',
  templateUrl: './modal-detalle-proveedor-informal.component.html',
  styleUrls: ['./modal-detalle-proveedor-informal.component.css']
})
export class ModalDetalleProveedorInformalComponent implements OnInit {
  @Input() data: any;
  constructor() { }

  ngOnInit() {
  }

  modalClose() {
    $('#modal-detalle-proveedo-informal').modal('toggle');
  }
}
