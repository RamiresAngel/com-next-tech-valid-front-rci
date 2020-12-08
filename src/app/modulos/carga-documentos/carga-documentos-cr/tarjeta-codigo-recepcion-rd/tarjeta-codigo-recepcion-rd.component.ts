import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CodigoRecepcion, CodigoRecepcionRD } from 'src/app/entidades/index';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as CDActions from '../../carga-dcoumentos.actions';
import { Subscription } from 'rxjs';
import { CDState } from '../../carga-documentos.reducer';

@Component({
  selector: 'app-tarjeta-codigo-recepcion-rd',
  templateUrl: './tarjeta-codigo-recepcion-rd.component.html',
  styleUrls: ['./tarjeta-codigo-recepcion-rd.component.css']
})
export class TarjetaCodigoRecepcionRdComponent {

  @Input() tarjetaCodigoRecepcion: CodigoRecepcion;
  @Input() tipo_moneda: string;
  @Input() bandera_devolucion: number;
  @Output() CRseleccionado = new EventEmitter();
  @Output() CReliminado = new EventEmitter();
  @Output() EnviarItems = new EventEmitter();

  subscripcion: Subscription;

  constructor(private store: Store<AppState>) { }

  seleccionado(data: CodigoRecepcionRD, obj: any) {
    if (obj.checked) {
      this.store.dispatch(new CDActions.AddCodigoRecepcionSeleccionado([data]));
      this.CRseleccionado.emit(data);
    } else {
      this.CReliminado.emit(data);
      this.store.dispatch(new CDActions.RemoveCodigoRecepcionSeleccionado([data]));
    }
  }

  public abrirDetalleCR(items): void {
    this.EnviarItems.emit(items);
    // $('#modal-detalle-cr').modal('toggle');
  }
}
