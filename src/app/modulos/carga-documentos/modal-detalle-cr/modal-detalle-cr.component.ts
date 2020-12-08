import { Component, OnInit, Input } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-modal-detalle-cr',
  templateUrl: './modal-detalle-cr.component.html',
  styleUrls: ['./modal-detalle-cr.component.css']
})
export class ModalDetalleCrComponent implements OnInit {

  @Input() items;

  constructor() { }

  ngOnInit() {
  }

  modalClose() {
    this.items = [];
    $('#modal-detalle-cr').modal('toggle');
  }

}
