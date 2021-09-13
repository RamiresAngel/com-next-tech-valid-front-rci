import { ListUsuarioComponent } from './../list-usuario/list-usuario.component';
import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-main-usuario',
  templateUrl: './main-usuario.component.html'
})
export class MainUsuarioComponent implements OnInit {
  public idTransaccion = 0;
  @ViewChild('lista') lista: ListUsuarioComponent;
  constructor() { }

  ngOnInit() {
  }


}
