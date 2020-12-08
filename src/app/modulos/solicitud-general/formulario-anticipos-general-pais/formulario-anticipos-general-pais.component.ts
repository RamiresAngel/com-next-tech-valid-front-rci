import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-anticipos-general-pais',
  templateUrl: './formulario-anticipos-general-pais.component.html',
  styleUrls: ['./formulario-anticipos-general-pais.component.css']
})
export class FormularioAnticiposGeneralPaisComponent implements OnInit {

  public pais = 'mx';

  constructor() { }

  ngOnInit() {
    this.pais = 'mx';
  }

}
