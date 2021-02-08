import { StorageService } from './../../../compartidos/login/storage.service';
import { ListComprobacionesGastosRciComponent } from './../list-comprobaciones-gastos-rci/list-comprobaciones-gastos-rci.component';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FiltroSolicitudes } from 'src/app/entidades';

@Component({
  selector: 'app-list-comprobaciones-gastos-pais',
  templateUrl: './list-comprobaciones-gastos-pais.component.html',
  styleUrls: ['./list-comprobaciones-gastos-pais.component.css']
})
export class ListComprobacionesGastosPaisComponent implements OnInit {

  @ViewChild('listcomprobaciongastos') ListComprobacionesGastos: ListComprobacionesGastosRciComponent;
  @Input() mostrar_boton;
  public filtro_comprobaciones_gastos = new FiltroSolicitudes(); /* la entidad es provisional en lo que se define una entidad */
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
    this.filtro_comprobaciones_gastos.estatus = 1;
  }

  actualizarTabla(filtro) {
    this.filtro_comprobaciones_gastos = filtro;
    this.ListComprobacionesGastos.actualizarTabla(filtro);

  }

}
