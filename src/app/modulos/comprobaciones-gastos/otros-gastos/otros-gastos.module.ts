import { NgxCurrencyModule } from 'ngx-currency';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from 'src/app/compartidos/shared-module/shared-module.module';
import { Select2Module } from 'ng2-select2';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtrosGastosRoutingModule } from './otros-gastos-routing.module';
import { OtrosGastosMainComponent } from './otros-gastos-main/otros-gastos-main.component';
import { OtrosGastosListComponent } from './otros-gastos-list/otros-gastos-list.component';
import { OtrosGastosFormComponent } from './otros-gastos-form/otros-gastos-form.component';
import { MyDatePickerModule } from 'mydatepicker';
import { FiltroComprobacionOtrosGastosComponent } from './components/filtro-comprobacion-otros-gastos/filtro-comprobacion-otros-gastos.component';
import { RouterModule } from '@angular/router';
import { DirectivasModule } from 'src/app/compartidos/directivas/directivas.module';
import { DataTablesModule } from 'angular-datatables';
import { AcreedoresDiversosModule } from '../../acreedores-diversos/acreedores-diversos.module';

@NgModule({
  imports: [
    CommonModule,
    OtrosGastosRoutingModule,
    Select2Module,
    SharedModuleModule,
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
