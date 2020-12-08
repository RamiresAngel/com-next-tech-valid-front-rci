import { Component, OnInit, Input } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-modal-detalle-factura-proveedor',
  templateUrl: './modal-detalle-factura-proveedor.component.html'
})
export class ModalDetalleFacturaProveedorComponent implements OnInit {
  @Input() data: any;
  constructor() { }

  ngOnInit() {
  }

  modalClose() {
    $('#modal-detalle-factura-proveedor').modal('toggle');
  }

}
