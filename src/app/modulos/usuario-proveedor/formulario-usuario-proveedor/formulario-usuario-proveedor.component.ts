import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-usuario-proveedor',
  templateUrl: './formulario-usuario-proveedor.component.html',
  styleUrls: ['./formulario-usuario-proveedor.component.css']
})
export class FormularioUsuarioProveedorComponent implements OnInit {

  public pais = 'mx';

  constructor() {
  }

  ngOnInit() {
    // Identificamos de que Pais es el usuario que inicio session
    this.pais = 'mx';
  }
}
