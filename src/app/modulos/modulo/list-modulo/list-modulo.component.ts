import { Modulo } from '../../../entidades/modulo';
import { Component, OnInit } from '@angular/core';
import { ModuloService } from '../modulo.service';
import { HttpResponse } from '@angular/common/http';
import { GlobalsComponent } from '../../../compartidos/globals/globals.component';
declare var $: any;

@Component({
  selector: 'app-list-modulo',
  templateUrl: './list-modulo.component.html'
})
export class ListModuloComponent implements OnInit {

  public pais: string;
  constructor(
  ) { }

  ngOnInit() {
    this.pais = 'mx';
  }
}
