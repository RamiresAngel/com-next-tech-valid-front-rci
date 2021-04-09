import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-solicitudes-pais',
  templateUrl: './form-solicitudes-pais.component.html',
  styleUrls: ['./form-solicitudes-pais.component.css']
})
export class FormSolicitudesPaisComponent implements OnInit {

  public pais = 'mx';
  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }

}
