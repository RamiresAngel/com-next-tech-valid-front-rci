import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-flujo-aprobacion-pais',
  templateUrl: './list-flujo-aprobacion-pais.component.html',
  styleUrls: ['./list-flujo-aprobacion-pais.component.css']
})
export class ListFlujoAprobacionPaisComponent implements OnInit {

  public pais = 'mx';

  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }

}
