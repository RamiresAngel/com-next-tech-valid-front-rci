import { Component, OnInit, Input } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-modal-documentos',
  templateUrl: './modal-documentos.component.html',
  styleUrls: ['./modal-documentos.component.css']
})
export class ModalDocumentosComponent implements OnInit {

  @Input() lista_documentos = new Array<any>();

  public TituloModalDoc: string = 'Documentos';
  constructor() { }

  ngOnInit() {
  }

  modalClose() {
    $('#modal-doc').modal('toggle');
  }

}
