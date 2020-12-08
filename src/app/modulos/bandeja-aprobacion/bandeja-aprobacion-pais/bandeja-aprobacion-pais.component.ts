import { Component, OnInit, ViewChild } from '@angular/core';
import { BandejaAprobacionMxComponent } from '../bandeja-aprobacion-mx/bandeja-aprobacion-mx.component';

@Component({
  selector: 'app-bandeja-aprobacion-pais',
  templateUrl: './bandeja-aprobacion-pais.component.html',
  styleUrls: ['./bandeja-aprobacion-pais.component.css']
})
export class BandejaAprobacionPaisComponent implements OnInit {

  public pais = 'mx';
  public tablaMostrar = 'priliminares';
  @ViewChild('bandeja') bandeja: BandejaAprobacionMxComponent;

  constructor() { }


  ngOnInit() {
  }

  seleccionaTabla( obj: any ) {
    this.tablaMostrar = obj;
  }

  aplicarFiltros( obj: any ) {
    this.bandeja.aplicarFiltros(obj);
  }

}
