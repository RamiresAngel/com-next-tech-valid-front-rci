import { Component, OnInit, Input } from '@angular/core';
import { DocumentoRelacionado, ComplementoDePago } from 'src/app/entidades';

@Component({
  selector: 'app-detalle-complementos',
  templateUrl: './detalle-complementos.component.html',
  styleUrls: ['./detalle-complementos.component.css']
})
export class DetalleComplementosComponent implements OnInit {

  @Input() complementos_pago: any;
  @Input() documentos_relacionados: any[];
  constructor() { }

  ngOnInit() {
    console.log(this.complementos_pago);
    console.log(this.documentos_relacionados);
  }

}
