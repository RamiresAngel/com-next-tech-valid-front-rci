import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-cfdi-pais',
  templateUrl: './lista-cfdi-pais.component.html',
  styleUrls: ['./lista-cfdi-pais.component.css']
})
export class ListaCfdiPaisComponent implements OnInit {

  public pais = 'mx';
  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }

  actualizarTabla() {
    console.log('Actualizando Tabla');
  }
}
