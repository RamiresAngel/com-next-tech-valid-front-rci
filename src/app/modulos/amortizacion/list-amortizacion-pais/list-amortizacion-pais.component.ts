import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FiltroAmortizadores } from 'src/app/entidades/Filtro-Amortizadores';
import { ListAmortizacionMxComponent } from '../list-amortizacion-mx/list-amortizacion-mx.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { ListaAmortizacionRdComponent } from '../lista-amortizacion-rd/lista-amortizacion-rd.component';

@Component({
  selector: 'app-list-amortizacion-pais',
  templateUrl: './list-amortizacion-pais.component.html',
  styleUrls: ['./list-amortizacion-pais.component.css']
})
export class ListAmortizacionPaisComponent {
  @Input() mostrar_btn = true;
  @ViewChild('tablaAmortizaciones') tablaAmortizaciones: ListAmortizacionMxComponent;
  @ViewChild('tablaAmortizacionesRD') tablaAmortizacionesRD: ListaAmortizacionRdComponent;

  public pais = 'MX';
  public filtroConsulta = new FiltroAmortizadores();
  constructor(
    private storageService: StorageService
  ) {
    this.pais = this.storageService.getDatosIniciales().usuario.pais;
  }

  actualizarTabla(datos: any) {
    if (this.pais !== "MX") {
      this.tablaAmortizacionesRD.actualizarTabla();
    } else {
      this.tablaAmortizaciones.actualizarTabla();
    }
  }


}
