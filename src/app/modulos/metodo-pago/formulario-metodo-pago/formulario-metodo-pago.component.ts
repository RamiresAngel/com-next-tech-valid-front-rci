import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-metodo-pago',
  templateUrl: './formulario-metodo-pago.component.html'
})
export class FormularioMetodoPagoComponent implements OnInit {
  pais: string;
  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }

}
