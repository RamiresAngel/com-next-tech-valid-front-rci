import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainBandejaAprobacionComponent } from './main-bandeja-aprobacion/main-bandeja-aprobacion.component';
import { BandejaAprobacionPaisComponent } from './bandeja-aprobacion-pais/bandeja-aprobacion-pais.component';
import { BandejaAprobacionMxComponent } from './bandeja-aprobacion-mx/bandeja-aprobacion-mx.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng2-select2';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { DirectivasModule } from 'src/app/compartidos/directivas/directivas.module';
import { NgxCurrencyModule } from 'ngx-currency';
import { MyDatePickerModule } from 'mydatepicker';
import { DataTablesModule } from 'angular-datatables';
import { FiltroBandejaAprobacionComponent } from './filtro-bandeja-aprobacion/filtro-bandeja-aprobacion.component';
import { AmortizacionModule } from '../amortizacion/amortizacion.module';
import { AcreedoresDiversosModule } from '../acreedores-diversos/acreedores-diversos.module';
import { ProveedoresInformalesModule } from '../proveedores-informales/proveedores-informales.module';
import { FacturasProveedorModule } from '../facturas-proveedor/facturas-proveedor.module';
import { NotasCreditoModule } from '../notas-credito/notas-credito.module';
import { ComprobacionesGastosModule } from '../comprobaciones-gastos/comprobaciones-gastos.module';
import { ComplementoPagoModule } from './../complemento-pago/complemento-pago.module';
import { CompartidosModule } from './../../compartidos/compartidos.module';
import { AprobacionGastosViajeComponent } from './aprobacion-gastos-viaje/aprobacion-gastos-viaje.component';
import { GastosViajesModule } from '../comprobaciones-gastos/gastos_viajes/gastos-viajes.module';
import { AprobacionOtrosGastosComponent } from './aprobacion-otros-gastos/aprobacion-otros-gastos.component';
import { AprobacionPrestacionesComponent } from './aprobacion-prestaciones/aprobacion-prestaciones.component';

@NgModule({
  imports: [
    CommonModule
    , RouterModule
    , CompartidosModule
    , FormsModule
    , Select2Module
    , HttpClientModule
    , BrowserModule
    , DirectivasModule
    , NgxCurrencyModule
    , MyDatePickerModule
    , DataTablesModule
    , ReactiveFormsModule
    , AmortizacionModule
    , AcreedoresDiversosModule
    , GastosViajesModule
    , ProveedoresInformalesModule
    , FacturasProveedorModule
    , ComprobacionesGastosModule
    , NotasCreditoModule
    , ComplementoPagoModule
  ],
  declarations: [
    MainBandejaAprobacionComponent
    , BandejaAprobacionPaisComponent
    , BandejaAprobacionMxComponent
    , FiltroBandejaAprobacionComponent,
    AprobacionGastosViajeComponent,
    AprobacionOtrosGastosComponent,
    AprobacionPrestacionesComponent
  ]
})
export class BandejaAprobacionModule { }
