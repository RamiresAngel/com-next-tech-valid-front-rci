import { GastosViajeModule } from './../gastos-viaje/gastos-viaje.module';
import { NgxCurrencyModule } from 'ngx-currency';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng2-select2';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDatePickerModule } from 'mydatepicker';
import { DataTablesModule } from 'angular-datatables';

import { CompartidosModule } from './../../compartidos/compartidos.module';

import { ComprobacionesGastosRoutingModule } from './comprobaciones-gastos-routing.module';
import { ComprobacionesMainComponent } from './components/comprobaciones-main/comprobaciones-main.component';
import { ListComprobacionesGastosPaisComponent } from './components/list-comprobaciones-gastos-pais/list-comprobaciones-gastos-pais.component';
import { ListComprobacionesGastosRciComponent } from './components/list-comprobaciones-gastos-rci/list-comprobaciones-gastos-rci.component';
import { FiltroComprobacionesGastosComponent } from './components/filtro-comprobaciones-gastos/filtro-comprobaciones-gastos.component';

@NgModule({
  imports: [
    CommonModule,
    ComprobacionesGastosRoutingModule,
    Select2Module,
    CompartidosModule,
    MyDatePickerModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCurrencyModule,
    GastosViajeModule,
    DataTablesModule
    // ReactiveFormsModule
  ],
  declarations: [
    ComprobacionesMainComponent,
    ListComprobacionesGastosPaisComponent,
    ListComprobacionesGastosRciComponent,
    FiltroComprobacionesGastosComponent,
  ], exports: [
    ListComprobacionesGastosPaisComponent,
    ListComprobacionesGastosRciComponent,
  ]
})
export class ComprobacionesGastosModule { }
