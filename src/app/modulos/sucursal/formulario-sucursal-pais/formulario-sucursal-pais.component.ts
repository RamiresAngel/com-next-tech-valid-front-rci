import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-sucursal-pais',
  templateUrl: './formulario-sucursal-pais.component.html',
  styleUrls: ['./formulario-sucursal-pais.component.css']
})
export class FormularioSucursalPaisComponent implements OnInit {

  public pais  = 'mx';

  constructor() { }

  ngOnInit() {
    // Identificamos el pais del usuario
    this.pais  = 'mx';
  }

}
