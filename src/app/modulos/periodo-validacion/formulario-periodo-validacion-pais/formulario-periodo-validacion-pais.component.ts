import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-periodo-validacion-pais',
  templateUrl: './formulario-periodo-validacion-pais.component.html',
  styleUrls: ['./formulario-periodo-validacion-pais.component.css']
})
export class FormularioPeriodoValidacionPaisComponent implements OnInit {

  public pais = 'mx';
  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }

}
