import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-modulo',
  templateUrl: './formulario-modulo.component.html'
})
export class FormularioModuloComponent implements OnInit {

  pais: string;
  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }

}
