import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-categoria-pais',
  templateUrl: './formulario-categoria-pais.component.html'
})
export class FormularioCategoriaPaisComponent implements OnInit {
  pais: string;

  constructor() {}

  ngOnInit() {
    this.pais = 'mx';
  }
}
