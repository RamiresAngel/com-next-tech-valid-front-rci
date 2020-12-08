import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-departamento',
  templateUrl: './formulario-departamento.component.html'
})
export class FormularioDepartamentoComponent implements OnInit {
  pais: string;
  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }

}
