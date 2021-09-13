import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-cuenta-agrupacion',
  templateUrl: './formulario-cuenta-agrupacion.component.html'
})
export class FormularioCuentaAgrupacionComponent implements OnInit {

  pais: string;

  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }

}
