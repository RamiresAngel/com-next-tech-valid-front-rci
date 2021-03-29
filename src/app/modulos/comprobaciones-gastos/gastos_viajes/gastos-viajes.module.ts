import { GastosViajeModule } from './../../gastos-viaje/gastos-viaje.module';
import { ComprobacionesGastosModule } from './../comprobaciones-gastos.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GastosViajesRoutingModule } from './gastos-viajes-routing.module';
import { CompartidosModule } from './../../../compartidos/compartidos.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { NgxCurrencyModule } from 'ngx-currency';
import { Select2Module } from 'ng2-select2';

import { GastosViajesMainComponent } from './gastos-viajes-main/gastos-viajes-main.component';
import { GastosViajesListComponent } from './gastos-viajes-list/gastos-viajes-list.component';
import { GastosViajesFormComponent } from './gastos-viajes-form/gastos-viajes-form.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DirectivasModule } from 'src/app/compartidos/directivas/directivas.module';
import { DataTablesModule } from 'angular-datatables';
import { AcreedoresDiversosModule } from '../../acreedores-diversos/acreedores-diversos.module';
import { FiltroComprobacionGVComponent } from './componentes/filtro-comprobacion/filtro-comprobacion-gv.component';

@NgModule({
  declarations: [
    GastosViajesMainComponent,
    GastosViajesListComponent,
    GastosViajesFormComponent,
    FiltroComprobacionGVComponent
  ],
  imports: [
    CommonModule,
    GastosViajesRoutingModule,
    Select2Module,
    CompartidosModule,
    MyDatePickerModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCurrencyModule,
    RouterModule,
    Select2Module,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DirectivasModule,
    MyDatePickerModule
    , DataTablesModule,
    AcreedoresDiversosModule,
    ComprobacionesGastosModule,
    GastosViajeModule
  ],
})
export class GastosViajesModule { }
