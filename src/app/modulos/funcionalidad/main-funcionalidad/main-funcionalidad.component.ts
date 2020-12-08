import { ListFuncionalidadComponent } from './../list-funcionalidad/list-funcionalidad.component';

import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-main-funcionalidad',
  templateUrl: './main-funcionalidad.component.html'
})
export class MainFuncionalidadComponent implements OnInit {
  @ViewChild('lista') lista: ListFuncionalidadComponent;
  constructor() { }

  ngOnInit() {
  }

}
