import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-funcionalidad',
  templateUrl: './formulario-funcionalidad.component.html'
})
export class FormularioFuncionalidadComponent implements OnInit {
  pais: string;
  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }
}
