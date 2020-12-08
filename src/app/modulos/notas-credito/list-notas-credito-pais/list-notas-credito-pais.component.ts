import { StorageService } from './../../../compartidos/login/storage.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ListNotasCreditoRciComponent } from '../list-notas-credito-rci/list-notas-credito-rci.component';

@Component({
  selector: 'app-list-notas-credito-pais',
  templateUrl: './list-notas-credito-pais.component.html',
  styleUrls: ['./list-notas-credito-pais.component.css']
})
export class ListNotasCreditoPaisComponent implements OnInit {

  @ViewChild('listnotascredito') ListNotasCreditoRciComponent: ListNotasCreditoRciComponent;
  @Input() mostrar_boton;
  /* posición para el filtro */
  public pais: string;
  public tipo_gastos: string;

  constructor(
    private storage: StorageService
  ) {
    this.tipo_gastos = this.storage.getDatosIniciales().funcionalidades.find(o => (o.clave === 'MOD_FLUJO') || (o.clave === 'VISTA_CARGADOC')).valor;
    console.log(this.tipo_gastos);
  }

  ngOnInit() {
    if (this.storage.getDatosIniciales().usuario.pais) {
      this.pais = this.storage.getDatosIniciales().usuario.pais;
    } else {
      this.pais = 'MX';
    }
  }

}
