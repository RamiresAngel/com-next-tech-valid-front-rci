import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-tipo-documento-sap',
  templateUrl: './list-tipo-documento-sap.component.html'
})
export class ListTipoDocumentoSapComponent implements OnInit {

  pais: string;
  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }

}
