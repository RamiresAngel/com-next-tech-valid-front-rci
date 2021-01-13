import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visor-factura',
  templateUrl: './visor-factura.component.html',
  styleUrls: ['./visor-factura.component.css']
})
export class VisorFacturaComponent implements OnInit {
  @Input() respuestaDetallesFActura;
  @Input() CFDI;
  otros_datos = 'cargando';
  factura;

  constructor(
    // public globals: GlobalsComponent
  ) { }

  ngOnChanges() {
    this.otros_datos = this.respuestaDetallesFActura;
    this.factura = this.CFDI;
  }


  ngOnInit() {
  }

  objectLength(objeto: object): number {
    let contador = 0;
    for (const i in objeto) {
      if (contador !== null) {
        contador += 1;
      }
    }
    return contador;
  }

}
