import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-descuento-pronto-pago',
  templateUrl: './form-descuento-pronto-pago.component.html',
  styleUrls: ['./form-descuento-pronto-pago.component.css']
})
export class FormDescuentoProntoPagoComponent implements OnInit {
  public pais: string;
  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }

}
