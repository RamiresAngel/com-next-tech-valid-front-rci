import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GastosViajesRoutingModule } from './gastos-viajes-routing.module';

import { SharedModuleModule } from 'src/app/compartidos/shared-module/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { NgxCurrencyModule } from 'ngx-currency';
import { Select2Module } from 'ng2-select2';

import { GastosViajesMainComponent } from './gastos-viajes-main/gastos-viajes-main.component';
import { GastosViajesListComponent } from './gastos-viajes-list/gastos-viajes-list.component';
import { GastosViajesFormComponent } from './gastos-viajes-form/gastos-viajes-form.component';

@NgModule({
  imports: [
    CommonModule,
    GastosViajesRoutingModule,
    Select2Module,
    SharedModuleModule,
    MyDatePickerModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCurrencyModule,
  ],
  declarations: [
    GastosViajesMainComponent,
    GastosViajesListComponent,
    GastosViajesFormComponent,]
})
export class GastosViajesModule { }
