import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-nivel-gasto-pais',
  templateUrl: './list-nivel-gasto-pais.component.html'
})
export class ListNivelGastoPaisComponent implements OnInit {
  public pais = 'mx';
  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }

}
