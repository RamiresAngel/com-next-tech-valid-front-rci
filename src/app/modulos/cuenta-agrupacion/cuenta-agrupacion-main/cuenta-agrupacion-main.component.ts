import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cuenta-agrupacion-main',
  templateUrl: './cuenta-agrupacion-main.component.html'
})
export class CuentaAgrupacionMainComponent implements OnInit {

  pais: string;

  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }

}
