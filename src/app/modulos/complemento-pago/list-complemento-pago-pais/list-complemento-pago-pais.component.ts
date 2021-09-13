import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FiltroSolicitudes } from 'src/app/entidades';
import { StorageService } from './../../../compartidos/login/storage.service';
import { ListComplementoPagoRciComponent } from '../list-complemento-pago-rci/list-complemento-pago-rci.component';

@Component({
  selector: 'app-list-complemento-pago-pais',
  templateUrl: './list-complemento-pago-pais.component.html',
  styleUrls: ['./list-complemento-pago-pais.component.css']
})
export class ListComplementoPagoPaisComponent implements OnInit {
  @ViewChild('listaComplementoPago') ListComplementoPagoRciComponent: ListComplementoPagoRciComponent;
  @Input() mostrar_boton;
  public filtro_complemento_pago = new FiltroSolicitudes();
  public pais: string;
  public tipo_gastos: string;

  constructor(
    private storage: StorageService
  ) {
    this.tipo_gastos = this.storage.getDatosIniciales().funcionalidades.find(o => (o.clave === 'MOD_FLUJO') || (o.clave === 'VISTA_CARGADOC')).valor;
  }

  ngOnInit() {
    if (this.storage.getDatosIniciales().usuario.pais) {
      this.pais = this.storage.getDatosIniciales().usuario.pais;
    } else {
      this.pais = 'MX';
    }
    this.filtro_complemento_pago.estatus = 1;
  }

  actualizarTabla(filtro) {
    this.filtro_complemento_pago = filtro;
    this.ListComplementoPagoRciComponent.actualizarTabla(filtro);
  }

}
