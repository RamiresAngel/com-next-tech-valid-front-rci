import { Component, OnInit , ViewChild } from '@angular/core';
import { ListReceptorComponent } from '../list-receptor/list-receptor.component';


@Component({
  selector: 'app-main-receptor',
  templateUrl: './main-receptor.component.html'
})
export class MainReceptorComponent implements OnInit {

  @ViewChild('lista') lista: ListReceptorComponent;
  constructor() { }

  ngOnInit() {
  }

  public actualizaTabla() {
    this.lista.updateReceptores();
  }

}
