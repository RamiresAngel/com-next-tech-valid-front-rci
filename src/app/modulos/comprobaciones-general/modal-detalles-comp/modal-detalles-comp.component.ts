import { Component, OnInit, Input } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-modal-detalles-comp',
  templateUrl: './modal-detalles-comp.component.html',
  styleUrls: ['./modal-detalles-comp.component.css']
})
export class ModalDetallesCompComponent implements OnInit {
  @Input() data;
  constructor() { }

  ngOnInit() {
  }

  modalClose() {
    $('#modal-detalles-comp').modal('toggle');
  }
}
