import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TipoRetencion } from 'src/app/entidades';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';

@Component({
  selector: 'app-retenciones-proveedores-informales',
  templateUrl: './retenciones-proveedores-informales.component.html',
  styleUrls: ['./retenciones-proveedores-informales.component.css']
})
export class RetencionesProveedoresInformalesComponent implements OnInit {
  @Input('lista_retenciones') lista_retenciones = new Array<TipoRetencion>();
  @Input('monto_retencion') monto_retencion: number = 0;
  @Output() emmitRetencion = new EventEmitter();


  constructor(private _globals: GlobalsComponent) { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.lista_retenciones.forEach((x: any) => {
      x.text = x.nombre + ' - ' + x.descripcion_indicador;
      return x;
    });
    this.lista_retenciones = this._globals.agregarSeleccione(this.lista_retenciones, 'Seleccione Retención...')
  }

}
