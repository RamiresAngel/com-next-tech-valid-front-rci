import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-cuenta-agrupacion',
  templateUrl: './list-cuenta-agrupacion.component.html'
})
export class ListCuentaAgrupacionComponent implements OnInit {

  constructor() { }

  pais: string;

  ngOnInit() {
    this.pais = 'mx';
  }

}
