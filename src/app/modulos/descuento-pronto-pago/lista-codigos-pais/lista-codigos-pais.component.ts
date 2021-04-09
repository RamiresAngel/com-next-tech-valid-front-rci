import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-codigos-pais',
  templateUrl: './lista-codigos-pais.component.html',
  styleUrls: ['./lista-codigos-pais.component.css']
})
export class ListaCodigosPaisComponent implements OnInit {
  public pais: string;
  public PAIS = 'mx';
  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }

}
