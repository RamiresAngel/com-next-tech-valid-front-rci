import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-comprobaciones-caja-chica',
  templateUrl: './form-comprobaciones-caja-chica.component.html',
  styleUrls: ['./form-comprobaciones-caja-chica.component.css']
})
export class FormComprobacionesCajaChicaComponent implements OnInit {

  public pais: string;
  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }

}
