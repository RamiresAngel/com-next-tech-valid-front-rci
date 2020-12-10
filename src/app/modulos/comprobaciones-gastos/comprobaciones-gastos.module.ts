import { NgxCurrencyModule } from 'ngx-currency';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from 'src/app/compartidos/shared-module/shared-module.module';
import { Select2Module } from 'ng2-select2';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprobacionesGastosRoutingModule } from './comprobaciones-gastos-routing.module';
import { ComprobacionesMainComponent } from './comprobaciones-main/comprobaciones-main.component';
import { OtrosGastosMainComponent } from './otros-gastos/otros-gastos-main/otros-gastos-main.component';
import { PrestacionesMainComponent } from './prestaciones/prestaciones-main/prestaciones-main.component';
import { PrestacionesListComponent } from './prestaciones/prestaciones-list/prestaciones-list.component';
import { PrestacionesFormComponent } from './prestaciones/prestaciones-form/prestaciones-form.component';
import { OtrosGastosListComponent } from './otros-gastos/otros-gastos-list/otros-gastos-list.component';
import { OtrosGastosFormComponent } from './otros-gastos/otros-gastos-form/otros-gastos-form.component';
import { MyDatePickerModule } from 'mydatepicker';
import { GastosViajesMainComponent } from './gastos_viajes/gastos-viajes-main/gastos-viajes-main.component';
import { GastosViajesListComponent } from './gastos_viajes/gastos-viajes-list/gastos-viajes-list.component';
import { GastosViajesFormComponent } from './gastos_viajes/gastos-viajes-form/gastos-viajes-form.component';
import { CajaChicaMainComponent } from './caja_chica/caja-chica-main/caja-chica-main.component';
import { CajaChicaListComponent } from './caja_chica/caja-chica-list/caja-chica-list.component';
import { CajaChicaFormComponent } from './caja_chica/caja-chica-form/caja-chica-form.component';




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
    // ReactiveFormsModule
  ],
  declarations: [
    ComprobacionesMainComponent,
    PrestacionesMainComponent,
    PrestacionesListComponent,
    PrestacionesFormComponent,
    OtrosGastosMainComponent,
    OtrosGastosListComponent,
    OtrosGastosFormComponent,
    GastosViajesMainComponent,
    GastosViajesListComponent,
    GastosViajesFormComponent,
    CajaChicaMainComponent,
    CajaChicaListComponent,
    CajaChicaFormComponent
  ]
})
export class ComprobacionesGastosModule { }
