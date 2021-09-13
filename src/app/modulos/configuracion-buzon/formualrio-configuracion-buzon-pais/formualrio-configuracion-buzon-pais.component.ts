import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formualrio-configuracion-buzon-pais',
  templateUrl: './formualrio-configuracion-buzon-pais.component.html',
  styleUrls: ['./formualrio-configuracion-buzon-pais.component.css']
})
export class FormualrioConfiguracionBuzonPaisComponent implements OnInit {

  public pais = 'mx';

  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }

}
