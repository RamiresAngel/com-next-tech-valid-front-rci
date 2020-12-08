import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-notificaciones-pais',
  templateUrl: './formulario-notificaciones-pais.component.html',
  styleUrls: ['./formulario-notificaciones-pais.component.css']
})
export class FormularioNotificacionesPaisComponent implements OnInit {

  public pais = 'mx';

  constructor() { }

  ngOnInit() {
  }

}
