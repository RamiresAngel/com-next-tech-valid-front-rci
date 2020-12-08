import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComprobacionesGeneralComponent } from './main-comprobaciones-general/main-comprobaciones-general.component';
import { FormComprobacionesGeneralComponent } from './form-comprobaciones-general/form-comprobaciones-general.component';
import { FormComprobacionesGeneralMxComponent } from './form-comprobaciones-general-mx/form-comprobaciones-general-mx.component';
import { ListComprobacionesGeneralMxComponent } from './list-comprobaciones-general-mx/list-comprobaciones-general-mx.component';
import { ListComprobacionesGeneralComponent } from './list-comprobaciones-general/list-comprobaciones-general.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng2-select2';
import { MyDatePickerModule } from 'mydatepicker';
import { DataTablesModule } from 'angular-datatables';
import { SharedModuleModule } from 'src/app/compartidos/shared-module/shared-module.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { DirectivasModule } from 'src/app/compartidos/directivas/directivas.module';
import { ComprobacionesGeneralService } from './comprobaciones-general.service';
import { NgxCurrencyModule } from 'ngx-currency';
import { FiltroComrpobacionesComponent } from './filtro-comrpobaciones/filtro-comrpobaciones.component';
import { ModalDetallesCompComponent } from './modal-detalles-comp/modal-detalles-comp.component';
import { CompartidosService } from 'src/app/compartidos/servicios_compartidos/compartidos.service';

export const customCurrencyMaskConfig = {
  align: 'right',
  allowNegative: true,
  allowZero: true,
  decimal: ',',
  precision: 2,
  prefix: '$ ',
  suffix: '',
  thousands: '.',
  nullable: true
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    Select2Module,
    DataTablesModule,
    MyDatePickerModule,
    SharedModuleModule,
    HttpClientModule,
    BrowserModule,
    DirectivasModule,
    NgxCurrencyModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
  ],
  providers: [
    ComprobacionesGeneralService
    , CompartidosService
  ],
  declarations: [
    MainComprobacionesGeneralComponent,
    FormComprobacionesGeneralComponent,
    FormComprobacionesGeneralMxComponent,
    ListComprobacionesGeneralMxComponent,
    ListComprobacionesGeneralComponent,
    FiltroComrpobacionesComponent,
    ModalDetallesCompComponent
  ]
})
export class ComprobacionesGeneralModule { }
