import { NgxCurrencyModule } from 'ngx-currency';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng2-select2';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataTablesModule } from 'angular-datatables';

import { DirectivasModule } from 'src/app/compartidos/directivas/directivas.module';
import { CompartidosModule } from './../../../compartidos/compartidos.module';
import { OtrosGastosRoutingModule } from './otros-gastos-routing.module';
import { MyDatePickerModule } from 'mydatepicker';

import { OtrosGastosMainComponent } from './otros-gastos-main/otros-gastos-main.component';
import { OtrosGastosListComponent } from './otros-gastos-list/otros-gastos-list.component';
import { OtrosGastosFormComponent } from './otros-gastos-form/otros-gastos-form.component';
import { AcreedoresDiversosModule } from '../../acreedores-diversos/acreedores-diversos.module';
import { FiltroComprobacionOtrosGastosComponent } from './components/filtro-comprobacion-otros-gastos/filtro-comprobacion-otros-gastos.component';

@NgModule({
  imports: [
    CommonModule,
    OtrosGastosRoutingModule,
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
    DirectivasModule,
    MyDatePickerModule,
    DataTablesModule,
    AcreedoresDiversosModule,
  ],
  declarations: [
    OtrosGastosMainComponent,
    OtrosGastosListComponent,
    OtrosGastosFormComponent,
    FiltroComprobacionOtrosGastosComponent,
  ]
})
export class OtrosGastosModule { }
