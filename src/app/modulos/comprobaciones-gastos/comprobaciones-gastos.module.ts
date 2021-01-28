import { GastosViajeModule } from './../gastos-viaje/gastos-viaje.module';
import { NgxCurrencyModule } from 'ngx-currency';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from 'src/app/compartidos/shared-module/shared-module.module';
import { Select2Module } from 'ng2-select2';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDatePickerModule } from 'mydatepicker';

import { ComprobacionesGastosRoutingModule } from './comprobaciones-gastos-routing.module';
import { ComprobacionesMainComponent } from './comprobaciones-main/comprobaciones-main.component';

@NgModule({
  imports: [
    CommonModule,
    ComprobacionesGastosRoutingModule,
    Select2Module,
    SharedModuleModule,
    MyDatePickerModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCurrencyModule,
    GastosViajeModule
    // ReactiveFormsModule
  ],
  declarations: [
    ComprobacionesMainComponent,
  ], exports: [
  ]
})
export class ComprobacionesGastosModule { }
