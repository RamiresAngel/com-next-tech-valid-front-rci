import { ListModuloComponent } from '../list-modulo/list-modulo.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main-modulo',
  templateUrl: './main-modulo.component.html'
})
export class MainModuloComponent implements OnInit {

  @ViewChild('lista') lista: ListModuloComponent;
  constructor() { }

  ngOnInit() {
  }

}
