import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificaciones-pais',
  templateUrl: './notificaciones-pais.component.html',
  styleUrls: ['./notificaciones-pais.component.css']
})
export class NotificacionesPaisComponent implements OnInit {

  public pais = 'mx';

  constructor() { }

  ngOnInit() {
  }

}
