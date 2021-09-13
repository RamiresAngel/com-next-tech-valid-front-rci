import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-solicitud-anticipo-cc-pais',
  templateUrl: './formulario-solicitud-anticipo-cc-pais.component.html',
  styleUrls: ['./formulario-solicitud-anticipo-cc-pais.component.css']
})
export class FormularioSolicitudAnticipoCcPaisComponent implements OnInit {

  public pais = 'mx';
  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }

}
