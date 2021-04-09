import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemDocumentoRD } from 'src/app/entidades';

@Component({
  selector: 'app-tabla-conceptos-agregados-rd',
  templateUrl: './tabla-conceptos-agregados-rd.component.html',
  styleUrls: ['./tabla-conceptos-agregados-rd.component.css']
})
export class TablaConceptosAgregadosRdComponent implements OnInit {
  @Input() conceptosAgregados = new Array<ItemDocumentoRD>();
  @Output() eliminarItem = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  eliminar(concepto: ItemDocumentoRD) {
    this.eliminarItem.emit(concepto);
  }

}
