import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-centro-costos-pais',
  templateUrl: './formulario-centro-costos-pais.component.html',
  styleUrls: ['./formulario-centro-costos-pais.component.css']
})
export class FormularioCentroCostosPaisComponent implements OnInit {

  public pais = 'mx';
  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }

}
