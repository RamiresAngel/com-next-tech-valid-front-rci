import { StorageService } from './../../../compartidos/login/storage.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-comprobaciones-gastos-pais',
  templateUrl: './list-comprobaciones-gastos-pais.component.html',
  styleUrls: ['./list-comprobaciones-gastos-pais.component.css']
})
export class ListComprobacionesGastosPaisComponent implements OnInit {

  @Input() mostrar_boton;
  public pais: string;
  public tipo_gastos: string;

  constructor(
    private storage: StorageService
  ) {
    this.tipo_gastos = this.storage.getDatosIniciales().funcionalidades.find(o => (o.clave === 'MOD_FLUJO') || (o.clave === 'VISTA_CARGADOC')).valor;
    // console.log(this.tipo_gastos);
  }

  ngOnInit() {
    if (this.storage.getDatosIniciales().usuario.pais) {
      this.pais = this.storage.getDatosIniciales().usuario.pais;
    } else {
      this.pais = 'MX';
    }
  }

}
