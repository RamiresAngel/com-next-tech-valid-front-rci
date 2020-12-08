import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CodigoRecepcion } from 'src/app/entidades/index';
declare var $: any;
@Component({
  selector: 'app-tarjeta-codigo-recepcion-mx',
  templateUrl: './tarjeta-codigo-recepcion-mx.component.html',
  styleUrls: ['./tarjeta-codigo-recepcion-mx.component.css']
})
export class TarjetaCodigoRecepcionMxComponent implements OnInit {

  @Input() tarjetaCodigoRecepcion: CodigoRecepcion;
  @Input() tipo_moneda: string;
  @Input() bandera_devolucion: number;
  @Output() CRseleccionado = new EventEmitter();
  @Output() CReliminado = new EventEmitter();
  @Output() EnviarItems = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  seleccionado(data: any, obj: any) {
    if (obj.checked) {
      this.CRseleccionado.emit(data);
    } else {
      this.CReliminado.emit(data);
    }
  }
  public abrirDetalleCR(items): void {
    this.EnviarItems.emit(items);
    // $('#modal-detalle-cr').modal('toggle');
  }
}
