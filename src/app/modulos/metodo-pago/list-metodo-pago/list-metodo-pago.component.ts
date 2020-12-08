import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-metodo-pago',
  templateUrl: './list-metodo-pago.component.html'
})
export class ListMetodoPagoComponent implements OnInit {
  pais: string;
  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }

}
