import { FuncionalidadService } from './../funcionalidad.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { GlobalsComponent } from '../../../compartidos/globals/globals.component';
declare var $: any;
@Component({
  selector: 'app-list-funcionalidad',
  templateUrl: './list-funcionalidad.component.html'
})
export class ListFuncionalidadComponent implements OnInit {
  public pais: string;
  constructor(public globals: GlobalsComponent) { }

  ngOnInit() {
    this.pais = 'mx';
  }
}
