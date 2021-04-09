import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-comprobaciones-pais',
  templateUrl: './form-comprobaciones-pais.component.html',
  styleUrls: ['./form-comprobaciones-pais.component.css']
})
export class FormComprobacionesPaisComponent implements OnInit {

  pais = 'mx';
  constructor() { }

  ngOnInit() {
  }

}
