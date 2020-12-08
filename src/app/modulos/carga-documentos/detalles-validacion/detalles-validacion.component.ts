import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalles-validacion',
  templateUrl: './detalles-validacion.component.html',
  styleUrls: ['./detalles-validacion.component.css']
})
export class DetallesValidacionComponent implements OnInit {

  public pais: string;
  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }

}
