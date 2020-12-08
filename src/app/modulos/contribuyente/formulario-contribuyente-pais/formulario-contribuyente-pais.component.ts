import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-contribuyente-pais',
  templateUrl: './formulario-contribuyente-pais.component.html',
  styleUrls: ['./formulario-contribuyente-pais.component.css']
})
export class FormularioContribuyentePaisComponent implements OnInit {

  public pais = 'mx';
  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }

}
