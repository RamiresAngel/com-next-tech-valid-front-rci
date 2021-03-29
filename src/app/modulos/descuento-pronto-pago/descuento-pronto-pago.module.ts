import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDescuentoProntoPagoComponent } from './main-descuento-pronto-pago/main-descuento-pronto-pago.component';
import { ListDescuentoProntoPagoComponent } from './list-descuento-pronto-pago/list-descuento-pronto-pago.component';
import { ListDescuentoProntoPagoMxComponent } from './list-descuento-pronto-pago-mx/list-descuento-pronto-pago-mx.component';
import { FormDescuentoProntoPagoMxComponent } from './form-descuento-pronto-pago-mx/form-descuento-pronto-pago-mx.component';
import { FormDescuentoProntoPagoComponent } from './form-descuento-pronto-pago/form-descuento-pronto-pago.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng2-select2';
import { MyDatePickerModule } from 'mydatepicker';
import { NgxCurrencyModule } from 'ngx-currency';
import { customCurrencyMaskConfig } from '../solicitud-general/solicitud-general.module';
import { SucursalService } from '../sucursal/sucursal.service';
import { CentroCostosService } from '../centro-costos/centro-costos.service';
import { ListaCfdiComponent } from './lista-cfdi/lista-cfdi.component';
import { ListaCodigosMxComponent } from './lista-codigos-mx/lista-codigos.component-mx';
import { FiltroListaCfdiComponent } from './filtro-lista-cfdi/filtro-lista-cfdi.component';
import { ListaCodigosPaisComponent } from './lista-codigos-pais/lista-codigos-pais.component';
import { ListaCfdiPaisComponent } from './lista-cfdi-pais/lista-cfdi-pais.component';
import { StorageService } from 'src/app/compartidos/login/storage.service';
import { GlobalsComponent } from 'src/app/compartidos/globals/globals.component';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';
import { CargaNotaCreditoComponent } from './carga-nota-credito/carga-nota-credito.component';

import { DataTablesModule } from 'angular-datatables';
import { DescuentoProntoPagoService } from './descuento-pronto-pago.service';
import { FiltCodigosComponent } from './filt-codigos/filt-codigos.component';
import { ListaFacturasAceptadasComponent } from './lista-facturas-aceptadas/lista-facturas-aceptadas.component';
import { CompartidosModule } from 'src/app/compartidos/compartidos.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    Select2Module,
    CompartidosModule,
    MyDatePickerModule,
    DataTablesModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
  ],
  providers: [
    SucursalService
    , CentroCostosService
    , StorageService
    , GlobalsComponent
    , CompartidosService
    , StorageService
    , FormsModule
    , ReactiveFormsModule
    , DescuentoProntoPagoService
  ]
  , declarations: [
    MainDescuentoProntoPagoComponent,
    ListDescuentoProntoPagoComponent,
    ListDescuentoProntoPagoMxComponent,
    FormDescuentoProntoPagoMxComponent,
    FormDescuentoProntoPagoComponent,
    ListaCfdiComponent,
    ListaCodigosMxComponent,
    FiltroListaCfdiComponent,
    ListaCodigosPaisComponent,
    ListaCfdiPaisComponent,
    CargaNotaCreditoComponent,
    FiltCodigosComponent,
    ListaFacturasAceptadasComponent
  ]
})
export class DescuentoProntoPagoModule { }
