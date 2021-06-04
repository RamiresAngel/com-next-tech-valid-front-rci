import { DataTablesModule } from 'angular-datatables';
import { NgxCurrencyModule } from 'ngx-currency';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng2-select2';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDatePickerModule } from 'mydatepicker';

import { CompartidosModule } from './../../../compartidos/compartidos.module';
import { DirectivasModule } from 'src/app/compartidos/directivas/directivas.module';

import { PrestacionesRoutingModule } from './prestaciones-routing.module';
import { PrestacionesMainComponent } from './prestaciones-main/prestaciones-main.component';
import { PrestacionesListComponent } from './prestaciones-list/prestaciones-list.component';
import { PrestacionesFormComponent } from './prestaciones-form/prestaciones-form.component';

@NgModule({
  imports: [
    CommonModule,
    PrestacionesRoutingModule,
    Select2Module,
    CompartidosModule,
    MyDatePickerModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCurrencyModule,
    DataTablesModule,
    DirectivasModule
  ],
  declarations: [
    PrestacionesMainComponent,
    PrestacionesListComponent,
    PrestacionesFormComponent,
  ]
})
export class PrestacionesModule { }
