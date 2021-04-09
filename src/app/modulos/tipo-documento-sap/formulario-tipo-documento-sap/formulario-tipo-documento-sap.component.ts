import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-tipo-documento-sap',
  templateUrl: './formulario-tipo-documento-sap.component.html'
})
export class FormularioTipoDocumentoSapComponent implements OnInit {

  pais: string;

  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }

}
