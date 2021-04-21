import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { ListAmortizacionMxComponent } from '../../amortizacion/list-amortizacion-mx/list-amortizacion-mx.component';
import { ListAcreedoresDiversosMxComponent } from '../../acreedores-diversos/list-acreedores-diversos-mx/list-acreedores-diversos-mx.component';
import { ListAnticiposGeneralMxComponent } from '../../solicitud-general/list-anticipos-general-mx/list-anticipos-general-mx.component';
import { ListProveedoresInformalesPaisComponent } from '../../proveedores-informales/list-proveedores-informales-pais/list-proveedores-informales-pais.component';
import { ListFacturasProveedorPaisComponent } from '../../facturas-proveedor/list-facturas-proveedor-pais/list-facturas-proveedor-pais.component';
import { ListNotasCreditoPaisComponent } from './../../notas-credito/list-notas-credito-pais/list-notas-credito-pais.component';
import { ListComprobacionesGastosPaisComponent } from '../../comprobaciones-gastos/components/list-comprobaciones-gastos-pais/list-comprobaciones-gastos-pais.component';
import { ListComplementoPagoPaisComponent } from './../../complemento-pago/list-complemento-pago-pais/list-complemento-pago-pais.component';

@Component({
  selector: 'app-bandeja-aprobacion-mx',
  templateUrl: './bandeja-aprobacion-mx.component.html',
  styleUrls: ['./bandeja-aprobacion-mx.component.css']
})
export class BandejaAprobacionMxComponent implements OnInit {

  @Input() tablaMostrar;
  @ViewChild('listaAmirtizacion') listaAmirtizacion: ListAmortizacionMxComponent;
  @ViewChild('listaAcreedores') listaAcreedores: ListAcreedoresDiversosMxComponent;
  @ViewChild('listaProveedores') listaProveedores: ListProveedoresInformalesPaisComponent;
  @ViewChild('listaSolicitudes') listaSolicitudes: ListAnticiposGeneralMxComponent;
  @ViewChild('facturas_proveedor') facturas_proveedor: ListFacturasProveedorPaisComponent;
  @ViewChild('complemento_pago') complemento_pago: ListComplementoPagoPaisComponent;
  @ViewChild('listnotascredito') listaNotasCredito: ListNotasCreditoPaisComponent;
  @ViewChild('comprobacion_gasto') comprobacion_gasto: ListComprobacionesGastosPaisComponent;
  mostrar_btn = false;
  constructor(
    public globals: GlobalsComponent
  ) { }

  ngOnInit() {
    this.tablaMostrar = 'facturas_proveedor';
  }

  aplicarFiltros(obj: any) {
  }

  cambio(obj: String) {
    this.tablaMostrar = obj;
  }

}
