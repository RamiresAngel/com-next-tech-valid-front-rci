import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-parametros-sistema-pais',
  templateUrl: './formulario-parametros-sistema-pais.component.html',
  styleUrls: ['./formulario-parametros-sistema-pais.component.css']
})
export class FormularioParametrosSistemaPaisComponent implements OnInit {

  public pais = 'mx';

  constructor() { }

  ngOnInit() {
     this.pais = 'mx';
  }

}
