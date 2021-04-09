import { Component, OnInit , ViewChild } from '@angular/core';
import { ListSucursalComponent } from '../list-sucursal/list-sucursal.component';

@Component({
  selector: 'app-main-sucursal',
  templateUrl: './main-sucursal.component.html'
})
export class MainSucursalComponent implements OnInit {

  @ViewChild('lista') lista: ListSucursalComponent;

  constructor() { }

  ngOnInit() {
  }

}
